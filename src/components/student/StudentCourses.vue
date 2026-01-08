<template>
  <div class="courses-container">
    <h2>Cursurile tale înrolate</h2>

    <div v-if="loading" class="status">Se încarcă cursurile...</div>

    <ul v-else-if="enrolledCourse" class="course-list">
      <li class="course-item">
        <span class="course-name">{{ enrolledCourse.name }}</span>
        <span class="course-dept">Departament: {{ enrolledCourse.department?.name }}</span>
      </li>
    </ul>

    <div v-else class="empty-state">
      <p>Nu ești înrolat la niciun curs momentan.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { listStudentsApi } from "../../api/api";
import { useAuthStore } from "../../stores/auth";

const enrolledCourse = ref(null);
const loading = ref(true);
const auth = useAuthStore();

onMounted(async () => {
  loading.value = true;
  try {
    // Deoarece backend-ul nu are endpoint separat pentru cursurile unui student,
    // preluăm lista de studenți și îl găsim pe cel logat pentru a-i vedea cursul.
    const res = await listStudentsApi();
    const me = res.data.find(s => s.email === auth.user.email);

    if (me && me.course) {
      enrolledCourse.value = me.course;
    }
  } catch (error) {
    console.error("Eroare la preluarea cursurilor:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.courses-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

.course-list {
  list-style: none;
  padding: 0;
}

.course-item {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-left: 5px solid #800000;
  background: #f9f9f9;
  margin-bottom: 10px;
}

.course-name {
  font-weight: bold;
  font-size: 1.2em;
  color: #800000;
}

.course-dept {
  font-size: 0.9em;
  color: #666;
}

.status, .empty-state {
  color: #888;
  font-style: italic;
}
</style>