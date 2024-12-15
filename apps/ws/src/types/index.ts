import WebSocket from "ws";

export type User = {
  userId: string;
  name: string;
  image: string | null;
  ws: WebSocket;
  rooms: string[];
};

export type Message = {
  type: string;
  userId: string;
  roomCode: string;
  userData?: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  message?: any;
  progress?: {
    wpm: number;
    accuracy: number;
    progress: number;
  };
  raceState?: {
    startTime?: number;
    countdownDuration?: number;
  };
  text: string;
};
