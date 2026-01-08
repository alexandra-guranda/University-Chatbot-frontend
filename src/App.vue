<template>
  <Navbar />
  <router-view />
  <Chatbot v-if="auth.user" />
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Chatbot from "./components/Chatbot.vue";
import { useAuthStore } from "./stores/auth";

const auth = useAuthStore();
</script>