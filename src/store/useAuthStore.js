import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  isEmailVerified: false,
  verificationStatus: 'pending', // 'pending', 'loading', 'success', 'error'
  isVerifying: false, 

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/profile");
      console.log("Checkauth response: ", res.data);

      const userData = res.data.data;
      
      set({ 
        authUser: userData,
        isEmailVerified: userData?.isEmailVerified || false
      });
      return true;
    } catch (error) {
      // Handle all errors gracefully
      if (error.response?.status === 401) {
        console.log("User not authenticated (expected)");
      } else {
        console.log("❌ Error checking auth:", error.message);
      }
      
      set({ 
        authUser: null,
        isEmailVerified: false
      });
      return false;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);

      toast.success(res.data.message || "Account created! Please verify your email.");
      return true; 
    } catch (error) {
      console.log("Error signing up", error);
      toast.error(error.response?.data?.message || "Error signing up");
      return false; 
    } finally {
      set({ isSigningUp: false });
    }
  },

  verify: async (verificationToken) => {
    const state = get();
  
    if (state.isVerifying || state.verificationStatus === 'success') {
      console.log('🚫 Verification already in progress or completed');
      return;
    }

    console.log('🔄 Starting verification for token:', verificationToken);
    set({ verificationStatus: 'loading', isVerifying: true });
    
    try {
      const res = await axiosInstance.get(`/auth/verifyEmail/${verificationToken}`);
      console.log('✅ Verification successful:', res.data);
      const userData = res.data.data;
      
      set({ 
        authUser: userData,
        isEmailVerified: true,
        verificationStatus: 'success',
        isVerifying: false
      });

      toast.success(res.data.message || "Email verified successfully!");
    } catch (error) {
      console.log("❌ Error Verifying User", error);
      console.log("❌ Error response:", error.response?.data);
      
      if (error.response?.data?.message?.includes('already verified') || 
          error.response?.status === 400) {
        console.log('📧 Email might already be verified');
        set({ 
          isEmailVerified: true,
          verificationStatus: 'success',
          isVerifying: false
        });
        toast.success("Email is already verified!");
      } else {
        set({ 
          isEmailVerified: false,
          verificationStatus: 'error',
          isVerifying: false
        });
        toast.error(error.response?.data?.message || "Error verifying email");
      }
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      const userData = res.data.data;
      
      set({ 
        authUser: userData,
        isEmailVerified: userData?.isEmailVerified || false
      });

      toast.success(res.data.message || "Login successful!");
      return true;
    } catch (error) {
      console.log("Error logging in", error);
      toast.error(error.response?.data?.message || "Error logging in");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ 
        authUser: null,
        isEmailVerified: false 
      });

      toast.success("Logout successful");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  },
}));
