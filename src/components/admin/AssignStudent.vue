<template>
  <div class="admin-card">
    <div class="form-group">
      <label>Selectează Studentul:</label>
      <select v-model="selectedStudentId" class="form-input">
        <option value="" disabled>Alege un student...</option>
        <option v-for="student in students" :key="student.id" :value="student.id">
          {{ student.name }} ({{ student.email }})
        </option>
      </select>

      <label>Selectează Cursul:</label>
      <select v-model="selectedCourseId" class="form-input">
        <option value="" disabled>Alege un curs...</option>
        <option v-for="course in courses" :key="course.id" :value="course.id">
          {{ course.name }} - Dept: {{ course.department?.name }}
        </option>
      </select>

      <button
          @click="assignStudent"
          :disabled="!selectedStudentId || !selectedCourseId || loading"
          class="btn-assign"
      >
        {{ loading ? 'Se procesează...' : 'Înrolează Student la Curs' }}
      </button>
    </div>

    <p v-if="statusMsg" :class="['status-msg', isError ? 'error' : 'success']">
      {{ statusMsg }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { listStudentsApi, listCoursesApi, assignStudentApi } from '../../api/api';

const students = ref([]);
const courses = ref([]);
const selectedStudentId = ref('');
const selectedCourseId = ref('');
const loading = ref(false);
const statusMsg = ref('');
const isError = ref(false);

// Încărcăm datele necesare pentru drop-down-uri la montarea componentei
onMounted(async () => {
  try {
    const [studentsRes, coursesRes] = await Promise.all([
      listStudentsApi(),
      listCoursesApi()
    ]);
    students.value = studentsRes.data;
    courses.value = coursesRes.data;
  } catch (error) {
    console.error("Eroare la încărcarea datelor:", error);
  }
});

const assignStudent = async () => {
  loading.value = true;
  statusMsg.value = '';

  try {
    // Apelăm endpoint-ul PUT /api/university/students/{id}/assign?courseId=...
    await assignStudentApi(selectedStudentId.value, selectedCourseId.value);

    isError.value = false;
    statusMsg.value = "Studentul a fost înrolat cu succes!";

    // Resetăm selecția
    selectedStudentId.value = '';
    selectedCourseId.value = '';
  } catch (error) {
    isError.value = true;
    statusMsg.value = "Eroare la înrolare. Verifică dacă studentul sau cursul mai există.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.admin-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-assign {
  background-color: #800000;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

.btn-assign:disabled {
  background-color: #ccc;
}

.status-msg {
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
}

.success { color: green; }
.error { color: red; }
</style>