import { reactive } from 'vue';
import api from '../api/axios';

export const authStore = reactive({
    user: null,
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,

    async login(email, password) {
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            this.token = response.data.token;
            this.role = response.data.role;
            this.user = {
                nickname: response.data.nickname,
                email: email
            };

            localStorage.setItem('token', this.token);
            localStorage.setItem('role', this.role);

            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    },

    async register(nickname, email, password) {
        try {
            await api.post('/auth/register', {
                nickname,
                email,
                password
            });
            return { success: true };
        } catch (error) {
            console.error("Register error:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed"
            };
        }
    },

    logout() {
        this.user = null;
        this.token = null;
        this.role = null;
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    },

    isAuthenticated() {
        return !!this.token;
    },

    isAdmin() {
        return this.role === 'admin';
    }
});
