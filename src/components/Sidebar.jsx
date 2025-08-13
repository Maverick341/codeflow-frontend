import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Zap, Crown, Shield, Code } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const { authUser } = useAuthStore();
  const location = useLocation();

  const sidebarVariants = {
    collapsed: { width: '80px' },
    expanded: { width: '280px' }
  };

  const contentVariants = {
    collapsed: { opacity: 0, x: -20 },
    expanded: { opacity: 1, x: 0 }
  };

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full bg-gradient-to-b from-base-100/95 via-base-100/98 to-base-200/95 backdrop-blur-md border-r border-white/10 z-40 flex flex-col shadow-2xl"
      style={{
        background: 'linear-gradient(180deg, rgba(26, 29, 41, 0.95) 0%, rgba(35, 40, 56, 0.98) 50%, rgba(45, 53, 72, 0.95) 100%)',
        backdropFilter: 'blur(12px)',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3), inset 1px 0 0 rgba(255, 255, 255, 0.1)'
      }}
      variants={sidebarVariants}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-codeflow-purple to-codeflow-blue shadow-lg flex-shrink-0"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2, delay: 0.1 }}
                className="overflow-hidden"
              >
                <Link to="/" className="block">
                  <span className="text-xl font-bold bg-gradient-to-r from-codeflow-purple to-codeflow-blue bg-clip-text text-transparent">
                    CodeFlow
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={authUser?.avatarUrl || 'https://avatar.iran.liara.run/public/boy'}
              alt="User Avatar"
              className="w-12 h-12 object-cover rounded-xl ring-2 ring-codeflow-purple/50"
            />
            {authUser?.role === 'ADMIN' && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-base-100"></div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <p className="text-sm font-semibold text-base-content truncate">
                  {authUser?.fullname || 'User'}
                </p>
                <p className="text-xs text-base-content/60 truncate">
                  {authUser?.email || 'user@example.com'}
                </p>
                {authUser?.role === 'ADMIN' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 text-xs rounded-full mt-1">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-2">
        <nav className="space-y-2">
          <motion.div
            whileHover={{ x: isExpanded ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`${!isExpanded ? 'tooltip tooltip-right' : ''}`} data-tip="My Profile">
              <Link
                to="/profile"
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group w-full ${
                  location.pathname === '/profile'
                    ? 'bg-gradient-to-r from-codeflow-purple/20 to-codeflow-blue/20 text-codeflow-purple'
                    : 'hover:bg-gradient-to-r hover:from-codeflow-purple/10 hover:to-codeflow-blue/10 hover:text-codeflow-purple'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                  location.pathname === '/profile'
                    ? 'bg-blue-500/20'
                    : 'bg-blue-500/10 group-hover:bg-blue-500/20'
                }`}>
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      variants={contentVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="overflow-hidden"
                    >
                      <div className="font-medium">My Profile</div>
                      <div className="text-xs text-base-content/60">View and edit profile</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          </motion.div>

          {authUser?.role === 'ADMIN' && (
            <motion.div
              whileHover={{ x: isExpanded ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`${!isExpanded ? 'tooltip tooltip-right' : ''}`} data-tip="Add Problem">
                <Link
                  to="/add-problem"
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group w-full ${
                    location.pathname === '/add-problem'
                      ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400'
                      : 'hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-red-500/10 hover:text-orange-400'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                    location.pathname === '/add-problem'
                      ? 'bg-orange-500/20'
                      : 'bg-orange-500/10 group-hover:bg-orange-500/20'
                  }`}>
                    <Code className="w-5 h-5 text-orange-400" />
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="overflow-hidden"
                      >
                        <div className="font-medium">Add Problem</div>
                        <div className="text-xs text-base-content/60">Create new challenges</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </div>
            </motion.div>
          )}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <motion.div
          whileHover={{ x: isExpanded ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`${!isExpanded ? 'tooltip tooltip-right' : ''}`} data-tip="Logout">
            <LogoutButton className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-500/20 hover:text-red-400 transition-all duration-200 group w-full justify-start">
              <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors flex-shrink-0">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="overflow-hidden"
                  >
                    <div className="font-medium">Logout</div>
                    <div className="text-xs text-base-content/60">Sign out of account</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </LogoutButton>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
