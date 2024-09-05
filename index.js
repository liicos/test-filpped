const WebSocket = require("ws");

// 创建一个 WebSocket 服务器
const wss = new WebSocket.Server({ port: 8080 });

// 用于存储所有连接的 WebSocket 实例
const clients = [];

wss.on("connection", (ws) => {
  console.log("新客户端已连接");

  // 将新连接的 WebSocket 实例添加到 clients 数组中
  clients.push(ws);

  // 处理消息
  ws.on("message", (message) => {
    console.log(`收到消息: ${message}`);

    // 将消息回传给客户端
    ws.send(`你发送的消息是: ${message}`);
  });

  // 发送欢迎消息
  ws.send("欢迎来到 WebSocket 服务器!");

  // 处理连接关闭
  ws.on("close", () => {
    console.log("客户端已断开连接");
    // 从 clients 数组中移除关闭的连接
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });
});

// 函数：向所有客户端推送消息
function broadcastMessage(message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// 示例：每隔 5 秒向所有客户端推送一条消息
setInterval(() => {
  broadcastMessage("这是来自服务器的定时消息");
}, 5000);

console.log("WebSocket 服务器已启动，端口: 8080");
