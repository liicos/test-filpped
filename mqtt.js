const express = require('express');
const mqtt = require('mqtt');

const app = express();
const PORT = 3000;

// 连接到 MQTT 代理
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('连接到 MQTT 代理');
});

// 发布消息的 API
app.post('/publish', express.json(), (req, res) => {
    const { topic, message } = req.body;
    client.publish(topic, message, (err) => {
        if (err) {
            return res.status(500).send('发布消息失败');
        }
        res.send('消息已发布');
    });
});

// 启动 Express 服务器
app.listen(PORT, () => {
    console.log(`服务器正在运行在 http://localhost:${PORT}`);
});
