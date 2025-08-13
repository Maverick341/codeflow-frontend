import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useAuthStore } from '../store/useAuthStore';
import { Loader } from 'lucide-react';

const Layout = () => {
  const { isCheckingAuth, checkAuth, authUser, justLoggedOut } = useAuthStore();
  const location = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Use landing page layout for homepage when not authenticated
  const isLandingPage = location.pathname === '/' && !authUser;
  const isProblemPage = location.pathname.startsWith('/problem/') && authUser;
  const isProfilePage = location.pathname === '/profile' && authUser;
  
  const isLeftNavPage = isProblemPage || isProfilePage;

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
  ) : isLeftNavPage ? (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <main
        className={`flex-1 transition-all duration-300 ease-in-out min-h-screen ${
          isSidebarExpanded ? 'ml-[280px] transform translate-x-2' : 'ml-[80px] transform translate-x-0'
        }`}
        style={{
          filter: isSidebarExpanded ? 'brightness(0.98)' : 'brightness(1)',
        }}
      >
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
