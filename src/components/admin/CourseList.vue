<template>
  <div class="course-list-container">
    <div v-if="loading" class="loader">Se încarcă cursurile...</div>

    <table v-else class="styled-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nume Curs</th>
        <th>Departament</th>
        <th>Acțiuni</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="course in courses" :key="course.id">
        <td>{{ course.id }}</td>
        <td>{{ course.name }}</td>
        <td>{{ course.department?.name || 'N/A' }}</td>
        <td>
          <button class="btn-delete" @click="confirmDelete(course.id)">Șterge</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="courses.length === 0 && !loading" class="empty-msg">
      Nu există cursuri înregistrate.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { listCoursesApi } from "../../api/api";

const courses = ref([]);
const loading = ref(true);

const loadCourses = async () => {
  loading.value = true;
  try {
    const res = await listCoursesApi();
    courses.value = res.data;
  } catch (error) {
    console.error("Eroare la încărcarea cursurilor:", error);
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (id) => {
  if (confirm(`Ești sigur că vrei să ștergi cursul cu ID-ul ${id}?`)) {
    alert("Funcționalitatea de ștergere curs nu este încă implementată în Backend.");
  }
};

onMounted(loadCourses);
</script>

<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}

.styled-table archaeological thead tr {
  background-color: #800000;
  color: #ffffff;
  text-align: left;
}

.styled-table th, .styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.btn-delete {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #cc0000;
}
</style>