import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProblemStore = create((set, get) => ({
  problems: [],
  problem: null,
  isProblemsLoading: false,
  isProblemLoading: false,
  isCreatingProblem: false,

  createProblem: async (problemData) => {
    set({ isCreatingProblem: true });
    try {
      const res = await axiosInstance.post(
        "/problems/createProblem",
        problemData
      );
      toast.success(res.data.message || "Problem Created successfully⚡");
      return { success: true, data: res.data.data };
    } catch (error) {
      console.log("Error creating problem:", error);
      toast.error(error.response?.data?.message || "Error creating problem");
      return { success: false, error };
    } finally {
      set({ isCreatingProblem: false });
    }
  },
}));
