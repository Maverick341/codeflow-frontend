import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

const LogoutButton = ({ children }) => {
  const { authUser, logout } = useAuthStore();

  const onLogout = async () => {
    await logout();
  };

  if (!authUser) {
    return null;
  }

  return (
    <button className="w-full justify-start" onClick={onLogout}>
      {children}
    </button>
  );
};

export default LogoutButton;
