import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from './Header';
import Footer from './Footer';
import { useAuthStore } from '../store/useAuthStore';
import { Loader } from 'lucide-react';

const Layout = () => {
  const { isCheckingAuth, checkAuth, authUser, justLoggedOut } = useAuthStore();
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Use landing page layout for homepage when not authenticated
  const isLandingPage = location.pathname === '/' && !authUser;
  const isProblemPage = location.pathname.startsWith('/problem/') && authUser;
  const isProfilePage = location.pathname === '/profile' && authUser;
  

  useEffect(() => {
    // Don't check auth if user just logged out (prevents race condition in production)
    if (!justLoggedOut) {
      checkAuth();
    } else {
      console.log('🚫 Skipping checkAuth in Layout - user just logged out');
    }
  }, [checkAuth, justLoggedOut]);

  return isCheckingAuth ? (
    <div className="flex items-center justify-center h-screen bg-background">
      <Loader className="size-10 animate-spin text-primary" />
    </div>
  ) : isLandingPage ? (
    <div className="min-h-screen bg-background flex flex-col w-full">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : isProfilePage ? (
    <div className="min-h-screen bg-background flex w-full">
      <Navbar variant="sidebar-profile" onExpandChange={setSidebarExpanded} />
      <main
        className={`flex-1 transition-all duration-300 min-h-screen ${sidebarExpanded ? 'ml-[240px]' : 'ml-[80px]'}`}
      >
        <Outlet />
      </main>
    </div>
  ) : isProblemPage ? (
    <div className="min-h-screen bg-background flex w-full">
      <Navbar variant="sidebar-problem" />
      <main className="flex-1 ml-[80px] transition-all duration-300 min-h-screen">
        <Outlet />
      </main>
    </div>
  ) : (
    <div className="bg-background min-h-screen w-full">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
