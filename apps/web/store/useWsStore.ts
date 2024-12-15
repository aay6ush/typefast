import { create } from "zustand";

type WsStore = {
  wsRef: WebSocket | null;
  setWsRef: (ws: WebSocket) => void;
};

const useWsStore = create<WsStore>((set) => ({
  wsRef: null,
  setWsRef: (ws: WebSocket) => {
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      set({ wsRef: null });
    };

    set({ wsRef: ws });
  },
}));

export default useWsStore;
