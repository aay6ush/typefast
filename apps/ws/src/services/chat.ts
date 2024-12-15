import WebSocket, { WebSocketServer } from "ws";
import { UserManager } from "./user";
import { Message } from "../types";
import { RedisManager } from "./redis";
import { Server } from "node:http";

export class ChatServer {
  private pubSub: RedisManager;
  private userManager: UserManager;
  private roomHosts: Map<string, string>;
  private wss: WebSocketServer;

  constructor(httpServer: Server) {
    this.pubSub = new RedisManager();
    this.userManager = new UserManager();
    this.roomHosts = new Map();

    this.wss = new WebSocketServer({ server: httpServer });

    this.wss.on("connection", this.handleConnection.bind(this));

    this.setupPubSub();
  }

  private handleConnection(ws: WebSocket) {
    ws.on("error", console.error);
    ws.on("message", (data) => this.handleMessage(ws, data));
    ws.on("close", () => this.handleClose(ws));
  }

  private setupPubSub() {
    this.pubSub.subscriber.on("message", (channel, message) => {
      const parsedMessage = JSON.parse(message);
      const users = this.userManager.getUsersInRoom(channel);

      users.forEach((user) => {
        user.ws.send(JSON.stringify(parsedMessage));
      });
    });
  }

  private async handleMessage(ws: WebSocket, data: WebSocket.RawData) {
    try {
      const parsedData: Message = JSON.parse(data.toString());
      const { type, userId, roomCode, userData } = parsedData;

      if (!this.userManager.getUser(userId)) {
        this.userManager.addUser(userId, ws, userData);
        this.broadcastOnlineUsers();
      }

      switch (type) {
        case "GET_ONLINE_USERS":
          this.sendOnlineUsers(ws);
          break;
        case "JOIN_ROOM":
          await this.handleJoinRoom(userId, roomCode);
          break;
        case "SEND_MESSAGE":
          await this.handleSendMessage(
            ws,
            userId,
            roomCode,
            parsedData.message!
          );
          break;
        case "START_RACE":
          await this.handleStartRace(roomCode, parsedData.text!);
          break;
        case "UPDATE_PROGRESS":
          await this.handleProgressUpdate(
            roomCode,
            userId,
            parsedData.progress!
          );
          break;
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }

  private sendOnlineUsers(ws: WebSocket) {
    const count = this.userManager.getUserCount();
    ws.send(
      JSON.stringify({
        type: "ONLINE_USERS",
        count,
      })
    );
  }

  private broadcastOnlineUsers() {
    const count = this.userManager.getUserCount();
    const message = JSON.stringify({
      type: "ONLINE_USERS",
      count,
    });

    this.userManager.getAllUsers().forEach((user) => {
      if (user.ws.readyState === WebSocket.OPEN) {
        user.ws.send(message);
      }
    });
  }

  private async handleJoinRoom(userId: string, roomCode: string) {
    try {
      const user = this.userManager.getUser(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      this.userManager.addUserToRoom(userId, roomCode);
      await this.pubSub.subscribe(roomCode);

      if (!this.roomHosts.has(roomCode)) {
        this.roomHosts.set(roomCode, userId);
      }

      const roomMembers = this.userManager
        .getAllUsers()
        .filter((u) => u.rooms.includes(roomCode))
        .map((u) => ({
          id: u.userId,
          name: u.name,
          image: u.image,
          isHost: u.userId === this.roomHosts.get(roomCode),
        }));

      this.pubSub.publish(roomCode, {
        type: "ROOM_MEMBERS",
        members: roomMembers,
      });
    } catch (error) {
      console.error(`Error handling join room for user ${userId}:`, error);
      throw error;
    }
  }

  private async handleSendMessage(
    ws: WebSocket,
    userId: string,
    roomCode: string,
    message: string
  ) {
    try {
      const user = this.userManager.getUser(userId);
      if (!user) {
        throw new Error("User not found");
      }

      this.pubSub.publish(roomCode, {
        type: "MESSAGE",
        userId: userId,
        message: message,
        userData: {
          name: user.name,
          image: user.image,
        },
      });
    } catch (error) {
      console.error("Error handling send message:", error);
      throw error;
    }
  }

  private async handleStartRace(roomCode: string, text: string) {
    try {
      const usersInRoom = this.userManager.getUsersInRoom(roomCode);
      if (!usersInRoom.length) {
        console.error("No users in room:", roomCode);
        return;
      }

      this.pubSub.publish(roomCode, {
        type: "RACE_STARTING",
        timestamp: Date.now(),
        text,
      });

      setTimeout(async () => {
        try {
          this.pubSub.publish(roomCode, {
            type: "RACE_START",
            timestamp: Date.now(),
          });
        } catch (error) {
          console.error("Error publishing RACE_START:", error);
        }
      }, 5000);
    } catch (error) {
      console.error("Error in handleStartRace:", error);
    }
  }

  private async handleProgressUpdate(
    roomCode: string,
    userId: string,
    progress: { wpm: number; accuracy: number; progress: number }
  ) {
    try {
      const usersInRoom = this.userManager.getUsersInRoom(roomCode);
      if (!usersInRoom.length) {
        console.error("No users in room for progress update:", roomCode);
        return;
      }

      const user = this.userManager.getUser(userId);
      if (!user) {
        console.error("User not found for progress update:", userId);
        return;
      }

      this.pubSub.publish(roomCode, {
        type: "PROGRESS_UPDATE",
        userId,
        progress,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Error in handleProgressUpdate:", error);
    }
  }

  private handleClose(ws: WebSocket) {
    const userEntry = this.userManager.getUserByWs(ws);
    if (userEntry) {
      const [userId, user] = userEntry;
      const rooms = user.rooms;

      rooms.forEach((roomCode) => {
        this.pubSub.publish(roomCode, {
          type: "MEMBER_LEFT",
          memberId: userId,
        });
      });

      this.userManager.removeUser(userId);
      this.broadcastOnlineUsers();
    }
  }
}
