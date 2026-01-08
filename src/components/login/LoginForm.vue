<template>
  <div class="login-card">
    <h2>University Platform</h2>
    <p>Introdu datele pentru a accesa contul</p>

    <form @submit.prevent="submit" class="login-form">
      <div class="input-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="student@university.com" required />
      </div>

      <div class="input-group">
        <label>Parolă</label>
        <input v-model="password" type="password" placeholder="********" required />
      </div>

      <button type="submit" :disabled="loading" class="login-btn">
        {{ loading ? 'Se autentifică...' : 'Autentificare' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useAuthStore} from "../../stores/auth";
import {useRouter} from "vue-router";

const email = ref("");
const password = ref("");
const loading = ref(false);

const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  loading.value = true;
  try {
    const user = await auth.login(email.value, password.value);

    if (!user) {
      alert("Credențiale invalide! (Verifică dacă ai adăugat un endpoint de login în Backend)");
      return;
    }

    // Redirecționare în funcție de rolul definit în auth.js
    if (auth.isAdmin()) {
      router.push("/admin");
    } else {
      router.push("/student");
    }
  } catch (error) {
    alert("Eroare la server. Asigură-te că backend-ul este pornit.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-card {
  max-width: 350px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background: white;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.input-group {
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 0.9em;
  margin-bottom: 5px;
  color: #666;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
}

.login-btn {
  background: #800000;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.login-btn:hover {
  background: #a00000;
}

.login-btn:disabled {
  background: #ccc;
}
</style>