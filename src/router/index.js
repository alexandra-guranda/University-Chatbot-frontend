import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AdminDashboard from "../layouts/AdminDashboard.vue";
import StudentDashboard from "../layouts/StudentDashboard.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
    { path: "/", component: Home },

    { path: "/admin", component: AdminDashboard, meta: { role: "admin" } },
    { path: "/student", component: StudentDashboard, meta: { role: "student" } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to) => {
    const auth = useAuthStore();

    if (!to.meta.role) return true;

    if (!auth.user) return "/";

    if (to.meta.role !== auth.user.role) return "/";

    return true;
});

export default router;
