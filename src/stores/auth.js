import { defineStore } from "pinia";
import { loginApi } from "../api/api";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
    }),

    actions: {
        async login(email, password) {
            try {
                const res = await loginApi(email, password);
                this.user = res.data.user;
                return this.user;
            } catch {
                return null;
            }
        },

        logout() {
            this.user = null;
        },

        isAdmin() {
            return this.user?.role === "admin";
        },

        isStudent() {
            return this.user?.role === "student";
        }
    }
});
