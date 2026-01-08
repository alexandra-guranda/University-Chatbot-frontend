<template>
  <nav class="navbar">
    <div class="nav-brand" @click="goHome">
      <h1>University Platform</h1>
    </div>

    <div class="nav-links" v-if="auth.user">
      <span class="user-info">Salut, {{ auth.user.name || auth.user.email }}!</span>

      <router-link v-if="auth.isAdmin()" to="/admin" class="nav-item">Dashboard Admin</router-link>
      <router-link v-if="auth.isStudent()" to="/student" class="nav-item">Cursurile Mele</router-link>

      <button @click="handleLogout" class="logout-btn">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const goHome = () => router.push("/");

const handleLogout = () => {
  auth.logout();
  router.push("/");
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background: #800000; /* Vișiniul tău universitar */
  color: white;
  height: 70px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.nav-brand {
  cursor: pointer;
}

.nav-brand h1 {
  margin: 0;
  font-size: 24px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  font-size: 0.9em;
  opacity: 0.9;
  border-right: 1px solid rgba(255,255,255,0.3);
  padding-right: 20px;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-item:hover {
  text-decoration: underline;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid white;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
}

.logout-btn:hover {
  background: white;
  color: #800000;
}
</style>