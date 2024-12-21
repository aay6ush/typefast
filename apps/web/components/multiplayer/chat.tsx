import { useCallback, useEffect, useRef, useState } from "react";
import { Send, MessagesSquare } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { ChatMessageProps, ChatProps, Message } from "@repo/common/types";
import useWsStore from "@/store/useWsStore";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

const Chat = ({ code }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { wsRef } = useWsStore((state) => state);

  const { data: session } = useSession();

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!inputMessage.trim() || !wsRef || !session?.user) return;

      wsRef.send(
        JSON.stringify({
          type: "SEND_MESSAGE",
          userId: session.user.id,
          roomCode: code,
          message: inputMessage.trim(),
        })
      );

      setInputMessage("");
    },
    [inputMessage, wsRef, session, code]
  );

  useEffect(() => {
    if (!wsRef) return;

    const handleWebSocketMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "MESSAGE") {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            sender: {
              name: data.userData.name,
              image: data.userData.image,
            },
            text: data.message,
          },
        ]);
        setTimeout(scrollToBottom, 100);
      }
    };

    wsRef.addEventListener("message", handleWebSocketMessage);
    return () => wsRef.removeEventListener("message", handleWebSocketMessage);
  }, [wsRef, scrollToBottom]);

  return (
    <Card className="lg:col-span-2 bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-3 text-neutral-200 text-2xl">
          <MessagesSquare className="size-8 text-emerald-400" />
          Chat
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="bg-neutral-800 border-neutral-700 text-neutral-200"
            />
            <Button type="submit" size="icon" disabled={!inputMessage.trim()}>
              <Send />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const initials =
    message.sender.name.split(" ").length === 1
      ? message.sender.name[0]
      : message.sender.name
          .split(" ")
          .map((part) => part[0])
          .join("");

  return (
    <div className="flex items-start gap-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={message.sender.image!} alt={message.sender.name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-neutral-200">
            {message.sender.name}
          </span>
        </div>
        <p className="text-neutral-300">{message.text}</p>
      </div>
    </div>
  );
};

export default Chat;
