<template>
  <div class="container admin-dashboard">
    <header class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <p>Gestionare cursuri, studenți și statistici universitare</p>
    </header>

    <div class="admin-grid">
      <div class="admin-card">
        <section>
          <h2><i class="icon">📚</i> Add Course</h2>
          <AddCourse />
        </section>
      </div>

      <div class="admin-card">
        <section>
          <h2><i class="icon">👥</i> Add Student</h2>
          <AddStudent />
        </section>
      </div>

      <div class="admin-card full-width">
        <section>
          <h2><i class="icon">🔗</i> Assign Student to Course</h2>
          <AssignStudent />
        </section>
      </div>

      <div class="admin-card full-width">
        <section>
          <h2><i class="icon">📋</i> Course List</h2>
          <CourseList />
        </section>
      </div>

      <div class="admin-card full-width">
        <section>
          <h2><i class="icon">📊</i> Secretariat Statistics</h2>
          <DepartmentStats />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddCourse from "../components/admin/AddCourse.vue";
import CourseList from "../components/admin/CourseList.vue";
import AddStudent from "../components/admin/AddStudent.vue";
import AssignStudent from "../components/admin/AssignStudent.vue";
import DepartmentStats from "../components/admin/DepartmentStats.vue";
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 40px auto;
}

.dashboard-header {
  margin-bottom: 30px;
  border-bottom: 2px solid #800000;
  padding-bottom: 10px;
}

.admin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.admin-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid #eee;
}

.full-width {
  grid-column: span 2;
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-style: normal;
}

@media (max-width: 768px) {
  .admin-grid {
    grid-template-columns: 1fr;
  }
  .full-width {
    grid-column: span 1;
  }
}
</style>