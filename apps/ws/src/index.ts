import { createServer } from "node:http";
import { ChatServer } from "./services/chat";
import express from "express";

const PORT = 8080;

const app = express();
const httpServer = createServer(app);

new ChatServer(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
