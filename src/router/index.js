import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AdminDashboard from "../layouts/AdminDashboard.vue";
import StudentDashboard from "../layouts/StudentDashboard.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
    { path: "/", name: "Home", component: Home },
    {
        path: "/admin",
        name: "Admin",
        component: AdminDashboard,
        meta: { requiresAdmin: true }
    },
    {
        path: "/student",
        name: "Student",
        component: StudentDashboard,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to) => {
    const auth = useAuthStore();

    // 1. Dacă pagina nu necesită autentificare, lasă-l să treacă
    if (!to.meta.requiresAdmin && !to.meta.requiresAuth) return true;

    // 2. Dacă nu este logat deloc, trimite-l la login (Home)
    if (!auth.user) return "/";

    // 3. Dacă pagina cere ADMIN, dar el nu este admin (verificat prin email în store)
    if (to.meta.requiresAdmin && !auth.isAdmin()) {
        alert("Acces refuzat: Nu ai drepturi de administrator.");
        return "/";
    }

    return true;
});

export default router;