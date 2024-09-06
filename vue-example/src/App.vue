<script setup>
import mqtt from "mqtt";
import { ref } from "vue";

// 连接到 MQTT 服务器
const client = mqtt.connect("ws://localhost:9001"); // 使用 WebSocket 连接
const messages = ref([]);
const topic = ref("");
const message = ref("");

client.on("connect", () => {
  console.log("连接到 MQTT 服务器");
  // 订阅主题
  client.subscribe("test/topic", (err) => {
    if (!err) {
      console.log("订阅成功");
    }
    console.log(err);
  });
});

// 处理接收到的消息
client.on("message", (topic, message) => {
  messages.value.push(message.toString());
});

const publishMessage = () => {
  if (topic.value && message.value) {
    client.publish(topic.value, message.value, (err) => {
      if (err) {
        console.error("发布失败:", err);
      } else {
        console.log("消息已发布:", message.value);
        message.value = ""; // 清空输入框
      }
    });
  }
};
</script>

<template>
  <div id="app">
    <h1>MQTT 示例</h1>
    <div>
      <input v-model="topic" placeholder="主题" />
      <input v-model="message" placeholder="消息" />
      <button @click="publishMessage">发布消息</button>
    </div>
    <div>
      <h2>接收到的消息：</h2>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
