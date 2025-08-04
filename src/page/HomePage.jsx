import React, { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import HeroPage from "../components/HeroPage";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { authUser } = useAuthStore();
  
  return !authUser ? <HeroPage /> : <Dashboard />; // will add imports after making components
};

export default HomePage;
