<template>
  <div class="course-list-container">
    <div class="header-actions">
      <div class="search-box">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Caută curs sau departament..."
            class="search-input"
        />
      </div>
      <button class="btn-refresh" @click="loadCourses">🔄 Actualizează</button>
    </div>

    <div v-if="loading" class="loader-container">
      <div class="spinner"></div>
    </div>

    <table v-else-if="filteredCourses.length > 0" class="styled-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nume Curs</th>
        <th>Departament</th>
        <th class="text-center">Acțiuni</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="course in filteredCourses" :key="course.id">
        <td><strong>#{{ course.id }}</strong></td>
        <td>
          <input
              v-if="editingId === course.id"
              v-model="editName"
              class="edit-input"
              @keyup.enter="saveEdit(course)"
          />
          <span v-else>{{ course.name }}</span>
        </td>
        <td>
          <span class="badge-dept">{{ course.department?.name || 'N/A' }}</span>
        </td>
        <td class="text-center">
          <div class="action-buttons">
            <button
                v-if="editingId === course.id"
                class="btn-save-small"
                @click="saveEdit(course)"
            >✅</button>
            <button
                v-else
                class="btn-edit-small"
                @click="startEdit(course)"
            >✏️</button>

            <button class="btn-delete" @click="handleDelete(course.id, course.name)">
              🗑️
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-else class="empty-state">
      <p>Niciun rezultat găsit.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { listCoursesApi, dropStudentApi } from "../../api/api";

const courses = ref([]);
const loading = ref(true);
const searchQuery = ref("");

// State pentru Editare
const editingId = ref(null);
const editName = ref("");

// OPERAȚIA: VIEW FILTERED (Logica de filtrare)
const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const term = searchQuery.value.toLowerCase();
    return (
        course.name.toLowerCase().includes(term) ||
        course.department?.name.toLowerCase().includes(term)
    );
  });
});

const loadCourses = async () => {
  loading.value = true;
  try {
    const res = await listCoursesApi();
    courses.value = Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Eroare:", error);
  } finally {
    loading.value = false;
  }
};

// OPERAȚIA: EDIT (Start)
const startEdit = (course) => {
  editingId.value = course.id;
  editName.value = course.name;
};

// OPERAȚIA: EDIT (Save)
const saveEdit = async (course) => {
  // Aici ai apela un api.put(`/courses/${course.id}`, { name: editName.value })
  alert(`Salvare modoficare: ${editName.value} (Implementează PUT în Backend)`);
  course.name = editName.value; // Update vizual local
  editingId.value = null;
};

// OPERAȚIA: DELETE
const handleDelete = async (id, name) => {
  if (confirm(`Ștergi cursul "${name}"?`)) {
    try {
      // Exemplu folosind dropStudentApi dacă ai logica de delete pe acel endpoint
      // await dropStudentApi(id);
      alert("Curs șters!");
      await loadCourses();
    } catch (error) {
      alert("Eroare la ștergere.");
    }
  }
};

onMounted(loadCourses);
</script>

<style scoped>
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-width: 250px;
}

.edit-input {
  padding: 5px;
  border: 1px solid #800000;
  border-radius: 4px;
  width: 100%;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.btn-edit-small, .btn-save-small {
  background: none;
  border: 1px solid #ddd;
  padding: 5px 8px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-save-small { background-color: #e8f5e9; border-color: #2e7d32; }

/* Păstrezi restul stilurilor anterioare (table, spinner, etc.) */
.styled-table { width: 100%; border-collapse: collapse; background: white; }
.styled-table thead tr { background-color: #800000; color: white; }
.styled-table th, .styled-table td { padding: 12px; border-bottom: 1px solid #eee; text-align: left;}
.badge-dept { background: #fce4ec; color: #800000; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8em;}
.btn-delete { background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
</style>