<template>
  <div class="chatbot-wrapper" :class="{ 'is-open': isOpen }">
    <div class="chat-header" @click="isOpen = !isOpen">
      <span>💬 Asistent AI Universitar</span>
      <button class="toggle-btn">{{ isOpen ? '−' : '▲' }}</button>
    </div>

    <div v-if="isOpen" class="chat-body">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
        <div class="text">{{ msg.text }}</div>
      </div>
      <div v-if="loading" class="message bot loading">Se scrie...</div>
    </div>

    <div v-if="isOpen" class="chat-footer">
      <input
          v-model="userInput"
          @keyup.enter="handleSendMessage"
          placeholder="Întreabă despre cursuri..."
      />
      <button @click="handleSendMessage" :disabled="loading">Trimite</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { sendMessageToChatbot } from '../api/api';

const isOpen = ref(false);
const userInput = ref('');
const loading = ref(false);
const messages = ref([
  { role: 'bot', text: 'Bună! Sunt asistentul tău virtual. Cum te pot ajuta cu informații despre universitate?' }
]);

// Generăm un sessionId unic pentru sesiune (cerut de backend)
const sessionId = ref(crypto.randomUUID());

const handleSendMessage = async () => {
  if (!userInput.value.trim() || loading.value) return;

  const userText = userInput.value;
  messages.value.push({ role: 'user', text: userText });
  userInput.value = '';
  loading.value = true;

  try {
    // Apelăm endpoint-ul POST /api/chatbot/chat definit în backend
    const response = await sendMessageToChatbot(userText, sessionId.value);
    messages.value.push({ role: 'bot', text: response.data.response });
  } catch (error) {
    messages.value.push({ role: 'bot', text: 'Momentan nu pot răspunde. Te rog revino mai târziu.' });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 320px;
  background: white;
  border: 2px solid #800000;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}
.chat-header {
  background: #800000;
  color: white;
  padding: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-radius: 8px 8px 0 0;
}
.chat-body {
  height: 350px;
  overflow-y: auto;
  padding: 10px;
  background: #fdfdfd;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.message {
  padding: 8px 12px;
  border-radius: 10px;
  max-width: 80%;
  font-size: 0.9em;
  line-height: 1.4;
}
.user { align-self: flex-end; background: #e2e2e2; color: #333; }
.bot { align-self: flex-start; background: #ffebeb; color: #800000; border: 1px solid #ffcccc; }
.chat-footer {
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
}
.chat-footer input { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
.chat-footer button { margin-left: 5px; background: #800000; color: white; border: none; border-radius: 4px; cursor: pointer; }
</style>