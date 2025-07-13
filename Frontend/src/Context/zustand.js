import { create } from 'zustand';
import { toast } from "react-toastify";
import axios from "axios";

const useStore = create((set, get) => ({
  // Environment and static data
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  currency: "$",
  deliveryFee: 0,
  
  // State variables
  token: localStorage.getItem("token") || "",
  userId: null,
  navigate: null, // This will be set from component
  
  // Actions
  setToken: (token) => set({ token }),
  setNavigate: (navigate) => set({ navigate }),
  setUserId: (userId) => set({ userId }),

  // Get current user
  getCurrentUser: async () => {
    const { token, backendUrl, navigate } = get();
    
    if (!token) return;

    try {
      const response = await axios.get(
        `${backendUrl}/users/current-user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        set({ userId: response.data.data._id });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      if (error.response?.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem("token");
        set({ token: "", userId: null });
        navigate?.("/login");
      }
    }
  },

  // Initialize cart when user is available
  initializeCart: async () => {
    const { userId, token, fetchUserCart } = get();
    
    if (userId && token) {
      await fetchUserCart();
    }
  }
  
}));

export default useStore;