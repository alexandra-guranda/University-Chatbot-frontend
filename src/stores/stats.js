import { defineStore } from "pinia";
import { getStudentsPerDepartment, getCourseStats } from "../api/api";

export const useStatsStore = defineStore("stats", {
    state: () => ({
        deptStats: [],
        courseStats: []
    }),

    actions: {
        async loadStats() {
            this.deptStats = (await getStudentsPerDepartment()).data;
            this.courseStats = (await getCourseStats()).data;
        }
    }
});
