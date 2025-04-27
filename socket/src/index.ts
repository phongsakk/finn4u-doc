import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { env } from "./setting/env";
import { pipe2array } from "./utils/pipe2array";
import { PostRequest } from "./types/schema";

const origins = pipe2array(
  env("HTTP_ALLOW_ORIGIN", "http://localhost:5173|http://localhost:5174")
);
const httpPort = env("HTTP_PORT", "3000");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: origins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (_req, res) => {
  res.send(`version ${env("API_VERSION")}`);
});

app.post("/", (req, res) => {
  try {
    const body = PostRequest.parse(req.body);
    const topic = body.topic;
  
    io.emit(topic, JSON.stringify(body.data));
    res.send("success");
  } catch (error) {
    console.error(error);
    res.status(400).send("error");
  }
});

io.on("connection", (socket) => {
  const client = socket.client.request.url;
  console.log("a user connected", client);
});

io.on("disconnect", (socket) => {
  const client = socket.client.request.url;
  console.log("user disconnected", client);
});

server.listen(httpPort, () => {
  console.log(`server running at http://localhost:${httpPort}`);
});
