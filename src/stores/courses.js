import { defineStore } from "pinia";
import { addCourseApi, listCoursesApi } from "../api/api";

export const useCoursesStore = defineStore("courses", {
    state: () => ({
        courses: [],
    }),

    actions: {
        async loadCourses() {
            const res = await listCoursesApi();
            this.courses = res.data;
        },

        async addCourse(course) {
            await addCourseApi(course);
            await this.loadCourses();
        }
    }
});
