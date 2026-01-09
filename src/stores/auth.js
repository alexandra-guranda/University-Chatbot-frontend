import { defineStore } from "pinia";
import { loginApi } from "../api/api";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        // Încărcare inițială din memoria browserului
        user: JSON.parse(localStorage.getItem("user")) || null,
    }),

    getters: {
        // Getter pentru a verifica rapid dacă cineva este logat
        isAuthenticated: (state) => !!state.user,

        // Verifică dacă userul curent este adminul sistemului
        isAdminUser: (state) => state.user?.email === "admin@university.ro",
    },

    actions: {
        async login(email, password) {
            try {
                // Trimitem cererea către Backend (Spring Boot)
                const res = await loginApi(email, password);

                // Spring returnează obiectul Student dacă parola e corectă
                if (res && res.data) {
                    this.user = res.data;

                    // Salvăm obiectul complet (id, nume, email) pentru persistență
                    localStorage.setItem("user", JSON.stringify(this.user));

                    console.log("Autentificare reușită pentru:", this.user.name);
                    return this.user;
                }
                return null;
            } catch (error) {
                console.error("Eroare la autentificare:", error.response?.data || error.message);
                this.user = null;
                return null;
            }
        },

        logout() {
            this.user = null;
            localStorage.removeItem("user");
            console.log("User delogat cu succes.");
        },

        isAdmin() {
            return this.user?.email === "admin@university.ro";
        },

        isStudent() {
            return this.user && this.user.email !== "admin@university.ro";
        }
    }
});