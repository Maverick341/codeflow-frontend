import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./page/HomePage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import SignUpPage from "./page/SignUpPage.jsx";
import VerifyEmailPage from "./page/VerifyEmailPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import Layout from "./layout/Layout.jsx";

const App = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/verify-email"
          element={<VerifyEmailPage />}
        />
        <Route
          path="/verify-email/:token"
          element={<VerifyEmailPage />}
        />
        {/* <Route
          path="/profile"
          element={<ProfilePage />}
        /> */}
      </Routes>
    </div>
  );
};

export default App;
