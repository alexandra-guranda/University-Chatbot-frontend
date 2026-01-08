<template>
  <div class="admin-card">
    <div class="form-group">
      <input
          v-model="studentName"
          type="text"
          placeholder="Nume complet student"
          class="form-input"
      />
      <input
          v-model="studentEmail"
          type="email"
          placeholder="Adresa de email (unică)"
          class="form-input"
      />
      <button
          @click="handleSave"
          :disabled="loading"
          class="btn-save"
      >
        {{ loading ? 'Se salvează...' : 'Adaugă Student' }}
      </button>
    </div>

    <p v-if="message" :class="['status-msg', isError ? 'error' : 'success']">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { addStudentApi } from '../../api/api';

const studentName = ref('');
const studentEmail = ref('');
const loading = ref(false);
const message = ref('');
const isError = ref(false);

const handleSave = async () => {
  if (!studentName.value || !studentEmail.value) {
    showStatus("Te rugăm să completezi toate câmpurile.", true);
    return;
  }

  loading.value = true;
  message.value = '';

  try {
    // Apelăm API-ul care trimite name și email ca RequestParams
    await addStudentApi(studentName.value, studentEmail.value);
    showStatus(`Studentul ${studentName.value} a fost adăugat cu succes!`, false);

    // Resetăm câmpurile
    studentName.value = '';
    studentEmail.value = '';
  } catch (error) {
    const errorMsg = error.response?.status === 400
        ? "Eroare: Email-ul există deja sau datele sunt invalide."
        : "Eroate la conectarea cu serverul.";
    showStatus(errorMsg, true);
  } finally {
    loading.value = false;
  }
};

const showStatus = (text, error) => {
  message.value = text;
  isError.value = error;
  setTimeout(() => message.value = '', 5000);
};
</script>

<style scoped>
.admin-card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fdfdfd;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-save {
  background-color: #800000;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-save:disabled {
  background-color: #a5a5a5;
}

.status-msg {
  margin-top: 15px;
  font-size: 0.9em;
  text-align: center;
}

.success { color: green; }
.error { color: #cc0000; }
</style>