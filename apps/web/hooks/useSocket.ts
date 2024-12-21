import useWsStore from "@/store/useWsStore";
import { useEffect, useState } from "react";

const useSocket = () => {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const { setWsRef } = useWsStore((state) => state);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(ws);
      setWsRef(ws);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};

export default useSocket;
