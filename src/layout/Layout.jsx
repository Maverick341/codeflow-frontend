import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from './Header';
import Footer from './Footer';
import { useAuthStore } from '../store/useAuthStore';
import { Loader } from 'lucide-react';

const Layout = () => {
  const { isCheckingAuth, checkAuth, authUser } = useAuthStore();
  const location = useLocation();

  // Use landing page layout for homepage when not authenticated
  const isLandingPage = location.pathname === '/' && !authUser;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-background flex flex-col w-full">
        <Header />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen w-full">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
