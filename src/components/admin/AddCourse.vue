<template>
  <div class="admin-card">
    <div class="form-group">
      <input v-model="name" placeholder="Nume Curs" class="form-input" />

      <select v-model="departmentId" class="form-input">
        <option value="" disabled>Selectează Departamentul</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.id">
          {{ dept.name }}
        </option>
      </select>

      <button @click="save" :disabled="!name || !departmentId" class="btn-save">
        Adaugă Curs
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCoursesStore } from "../../stores/courses";
import { listDepartmentsApi } from "../../api/api";

const name = ref("");
const departmentId = ref("");
const departments = ref([]);
const store = useCoursesStore();

// Încărcăm departamentele la montare pentru a avea ID-uri valide
onMounted(async () => {
  const res = await listDepartmentsApi();
  departments.value = res.data;
});

const save = async () => {
  // Transmiți parametrii separat, conform api.js și backend-ului
  await store.addCourse(name.value, departmentId.value);

  name.value = "";
  departmentId.value = "";
  alert("Cursul a fost adăugat!");
};
</script>