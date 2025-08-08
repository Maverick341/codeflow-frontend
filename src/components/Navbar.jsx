import React from 'react';
import { User, Code, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { motion } from "framer-motion";
import { Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";

const Navbar = () => {
  const { authUser } = useAuthStore();
  console.log(authUser?.avatarUrl);
  
  return (
    <nav className="sticky top-0 z-50 w-full py-0">
      <motion.header
        className={`border-b transition-all duration-300 border-gray-700/20 bg-background/80 backdrop-blur-sm`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative flex h-16 w-full items-center px-6">
          {/* Left: Logo */}
          <div className="flex items-center h-full">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="flex items-center space-x-2 group">
                <motion.div
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-codeflow-purple to-codeflow-blue shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)' }}
                  whileHover={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)", scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <Zap className="h-5 w-5 text-white" />
                  </motion.div>
                </motion.div>
                <motion.span
                  className="text-xl font-bold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-codeflow-purple group-hover:to-codeflow-blue group-hover:bg-clip-text group-hover:text-transparent"
                  style={{ color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                >
                  CodeFlow
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Center: Badge (absolutely centered, does not affect spacing) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="relative">
              <div className="flex items-center gap-2 rounded-full border border-gray-600/20 bg-gradient-to-r from-white/5 to-white/10 px-4 py-2 backdrop-blur-sm hover:border-codeflow-purple/40 hover:bg-gradient-to-r hover:from-codeflow-purple/10 hover:to-codeflow-blue/10 transition-all duration-300">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="h-4 w-4" style={{ color: '#8b5cf6' }} />
                </motion.div>
                <span className="text-sm font-medium text-white/90">Made for Developers</span>
              </div>
              {/* Animated border glow */}
              <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-codeflow-purple/30 to-codeflow-blue/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)' }} animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            </motion.div>
          </div>

          {/* Right: Auth Buttons/Profile */}
          <div className="flex items-center space-x-3 ml-auto h-full">
            {authUser ? (
              <>
                <LogoutButton className="hover:bg-primary hover:text-white">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </LogoutButton>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar flex flex-row ">
                    <div className="w-10 rounded-full ">
                      <img src={authUser?.avatarUrl || 'https://avatar.iran.liara.run/public/boy'} alt="User Avatar" className="object-cover" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3">
                    {authUser?.fullname && (
                      <li>
                        <p className="text-base font-semibold">{authUser?.fullname}</p>
                        <hr className="border-gray-200/10" />
                      </li>
                    )}
                    <li>
                      <Link to="/profile" className="hover:bg-primary hover:text-white text-base font-semibold">
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </Link>
                    </li>
                    {authUser?.role === 'ADMIN' && (
                      <li>
                        <Link to="/add-problem" className="hover:bg-primary hover:text-white text-base font-semibold">
                          <Code className="w-4 h-4 mr-1" />
                          Add Problem
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button asChild variant="ghost" size="sm" className="relative text-white/70 hover:text-white hover:bg-sky-400 transition-all duration-300 group">
                    <Link to="/login">
                      Login
                      <motion.div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-codeflow-purple to-codeflow-blue" style={{ background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)' }} whileHover={{ width: "100%", x: "-50%" }} transition={{ duration: 0.3 }} />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} animate={{ boxShadow: ["0 0 0 rgba(108, 92, 231, 0)", "0 0 20px rgba(108, 92, 231, 0.3)", "0 0 0 rgba(108, 92, 231, 0)"] }} transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.2 }, y: { duration: 0.2 } }}>
                  <Button asChild size="sm" className="relative overflow-hidden bg-gradient-to-r from-codeflow-purple to-codeflow-blue hover:from-codeflow-purple/90 hover:to-codeflow-blue/90 text-white font-medium shadow-lg border-0" style={{ background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)' }}>
                    <Link to="/signup">
                      <motion.span whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>Sign Up</motion.span>
                      {/* Shimmer effect */}
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }} />
                    </Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.header>
    </nav>
  );
};

export default Navbar;
