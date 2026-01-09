<template>
  <div class="admin-card">
    <div class="form-group">
      <input
          v-model="name"
          placeholder="Nume Departament (ex: IT, Matematică)"
          class="form-input"
      />
      <button @click="save" :disabled="!name || loading" class="btn-save">
        {{ loading ? 'Se salvează...' : 'Adaugă Departament' }}
      </button>
    </div>
    <p v-if="message" :class="['status-msg', isError ? 'error' : 'success']">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addDepartmentApi } from "../../api/api";

const name = ref("");
const loading = ref(false);
const message = ref("");
const isError = ref(false);

const save = async () => {
  loading.value = true;
  try {
    await addDepartmentApi(name.value);
    message.value = "Departament adăugat cu succes!";
    isError.value = false;
    name.value = "";
    // Trimitem un semnal că lista de departamente trebuie reîncărcată în AddCourse
    window.dispatchEvent(new CustomEvent("refresh-departments"));
  } catch (error) {
    message.value = "Eroare la salvare.";
    isError.value = true;
  } finally {
    loading.value = false;
  }
};
</script>