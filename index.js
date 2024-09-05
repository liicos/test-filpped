const WebSocket = require("ws");

// 创建一个 WebSocket 服务器
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("新客户端已连接");

  // 处理消息
  ws.on("message", (message) => {
    console.log(`收到消息: ${message}`);

    // 将消息回传给客户端
    ws.send(`你发送的消息是: ${message}`);
  });

  // 发送欢迎消息
  ws.send("欢迎来到 WebSocket 服务器!");
});

console.log("WebSocket 服务器已启动，端口: 8080");
