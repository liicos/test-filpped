<script setup>
import mqtt from "mqtt";

// 连接到 MQTT 服务器
const client = mqtt.connect("ws://192.168.140.173:9001"); // 使用 WebSocket 连接

client.on("connect", () => {
  console.log("连接到 MQTT 服务器");
  // 订阅主题
  this.client.subscribe("test/topic", (err) => {
    if (!err) {
      console.log("订阅成功");
    }
  });
});

// 处理接收到的消息
client.on("message", (topic, message) => {
  this.messages.push(message.toString());
});

const publishMessage = () => {
  if (this.topic && this.message) {
    client.publish(this.topic, this.message, (err) => {
      if (err) {
        console.error("发布失败:", err);
      } else {
        console.log("消息已发布:", this.message);
        this.message = ""; // 清空输入框
      }
    });
  }
};
</script>

<template>123</template>

<style scoped></style>
