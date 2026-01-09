import axios from "axios";

// Instanța principală pentru entitățile universității
const api = axios.create({
    baseURL: "http://localhost:8080/api/university",
});

// Instanță pentru chatbot și funcții generale (Login/Health)
const commonApi = axios.create({
    baseURL: "http://localhost:8080/api",
});

// ----- CHATBOT & AUTH -----
export const sendMessageToChatbot = (message, sessionId) =>
    commonApi.post("/chatbot/chat", { message, sessionId });

export const checkApiHealth = () =>
    commonApi.get("/chatbot/health");

export const loginApi = (email, password) =>
    axios.post("http://localhost:8080/api/auth/login", { email, password });


// ----- COURSES (Cursuri) -----
export const addCourseApi = (name, departmentId) =>
    api.post(`/courses`, null, {
        params: { name, departmentId },
    });

export const listCoursesApi = () =>
    api.get(`/courses`);


// ----- STUDENTS (Studenți) -----
export const addStudentApi = (name, email) =>
    api.post(`/students`, null, {
        params: { name, email },
    });

export const listStudentsApi = () =>
    api.get(`/students`);

export const assignStudentApi = (studentId, courseId) =>
    api.put(`/students/${studentId}/assign`, null, {
        params: { courseId },
    });

export const dropStudentApi = (studentId) =>
    api.delete(`/students/${studentId}`);


// ----- DEPARTMENTS (Departamente) -----
export const listDepartmentsApi = () =>
    api.get(`/departments`);

// AM PĂSTRAT DOAR O SINGURĂ DECLARARE AICI:
export const addDepartmentApi = (name) =>
    api.post(`/departments`, null, {
        params: { name }
    });


// ----- SECRETARIAT & STATS (Statistici) -----
export const getStudentsPerDepartmentApi = () =>
    api.get(`/secretariat/students-per-department`);

export const getCourseEnrollmentStatsApi = () =>
    api.get(`/secretariat/course-enrollment`);

export default {
    api,
    commonApi
};