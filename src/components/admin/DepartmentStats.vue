<template>
  <div class="stats-grid">
    <div class="chart-container">
      <h2>Studenți per Departament</h2>
      <v-chart :option="deptOption" class="chart" autoresize />
    </div>

    <div class="chart-container">
      <h2>Înrolări pe Cursuri</h2>
      <v-chart :option="courseOption" class="chart" autoresize />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, PieChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
// Importăm metodele corecte din api.js-ul rescris
import { getStudentsPerDepartmentApi, getCourseEnrollmentStatsApi } from "../../api/api";

// Înregistrare module ECharts necesare
use([CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent]);

const deptOption = ref({});
const courseOption = ref({});

onMounted(async () => {
  try {
    const [deptRes, courseRes] = await Promise.all([
      getStudentsPerDepartmentApi(),
      getCourseEnrollmentStatsApi()
    ]);

    // Backend-ul tău returnează DepartmentStatsDTO (departmentName, studentCount)
    deptOption.value = {
      tooltip: {trigger: 'axis'},
      xAxis: {
        type: 'category',
        data: deptRes.data.map(d => d.departmentName)
      },
      yAxis: {type: 'value'},
      series: [{
        data: deptRes.data.map(d => d.studentCount),
        type: 'bar',
        color: '#800000'
      }]
    };

    // Backend-ul tău returnează CourseEnrollmentDTO (courseName, enrolledStudents)
    courseOption.value = {
      tooltip: {trigger: 'item'},
      legend: {orient: 'vertical', left: 'left'},
      series: [
        {
          name: 'Studenți înrolați',
          type: "pie",
          radius: '50%',
          data: courseRes.data.map(c => ({
            name: c.courseName,
            value: c.enrolledStudents
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  } catch (error) {
    console.error("Eroare la încărcarea statisticilor:", error);
  }
});
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.chart-container {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart {
  height: 400px;
  width: 100%;
}
</style>