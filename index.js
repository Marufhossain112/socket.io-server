const express = require("express");
const cors = require("cors");
const http = require("http");
const PORT = 5000;
const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
});
io.on("connection", (socket) => {
    console.log("new user is connected", socket.id);
    socket.on("disconnect", () => {
        console.log("disconnected", socket.id);
    });
});
app.get("/", (req, res) => {
    res.send("I am groot");
});
httpServer.listen(PORT, () => {
    console.log("I am running on 5000");
});