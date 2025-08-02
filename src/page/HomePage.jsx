import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Loader } from 'lucide-react';

const HomePage = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!authUser) {
      checkAuth();
    }
  }, [authUser, checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )

  // return !authUser ? <LandingPage /> : <Dashboard />; // will add imports after making components
}

export default HomePage