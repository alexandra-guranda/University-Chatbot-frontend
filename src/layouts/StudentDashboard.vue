<template>
  <div class="container student-dashboard">
    <header class="dashboard-header">
      <h1>Panel Student</h1>
      <p>Vizualizează cursurile tale și interacționează cu asistentul universitar.</p>
    </header>

    <div class="student-content">
      <section class="courses-section">
        <StudentCourses />
      </section>

      <section class="info-section">
        <div class="info-card">
          <h3>Ai întrebări?</h3>
          <p>Folosește chatbot-ul din colțul ecranului pentru a afla informații despre cursuri, departamente sau statistici universitare în timp real.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import StudentCourses from "../components/student/StudentCourses.vue";
</script>

<style scoped>
.student-dashboard {
  max-width: 1000px;
  margin: 40px auto;
}

.dashboard-header {
  margin-bottom: 30px;
  border-bottom: 2px solid #800000; /* Vișiniul tău universitar */
  padding-bottom: 10px;
}

.student-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.info-card {
  background: #ffebeb;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #800000;
}

.info-card h3 {
  color: #800000;
  margin-top: 0;
}

@media (max-width: 768px) {
  .student-content {
    grid-template-columns: 1fr;
  }
}
</style>