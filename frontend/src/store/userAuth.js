import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,

    signup: async (Credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post('/api/auth/signup', Credentials)
            set({ user: response.data.user, isSigningUp: false })
            toast.success("Account created Successfully")
        }

        catch (error) {
            toast.error(error.response?.data?.message || "Signup failed")
            console.log(error.message)
            set({ isSigningUp: false, user: null })
        }

    },

    authCheck: async () => {
        set({ isCheckingAuth: true })
        try {
            const response = await axios.get("/api/auth/authcheck")
            set({ user: response.data.user, isCheckingAuth: false })
        } catch (error) {
            set({ isCheckingAuth: false, user: null })
            toast.error(error.response.data.message || "Signup failed")
        }
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post("/api/auth/logout")
            set({ user: null, isLoggingOut: false })
            toast.success("logged out successfully")
        } catch (error) {
            set({ isLoggingOut: false })
            toast.error(error.response.data.message || "Log out Failed")

        }
    },
    login: async (credentials) => {
        set({ isLoggingIn: true })
        try {
            const response = await axios.post("/api/auth/login", credentials)
            set({ user: response.data.user, isloggingIn: false })
            toast.success("Login Successfully")
        } catch (error) {
            set({ isloggingIn: false })
            toast.error(error.response.data.message || "login failed")
        }
    }
}))