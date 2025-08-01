import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./page/HomePage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import SignUpPage from "./page/SignUpPage.jsx";
import VerifyEmailPage from "./page/VerifyEmailPage.jsx";

const App = () => {
  let authUser = null;
  let isEmailVerified = false; // This would come from your auth context/state
  
  return (
    <div className="flex flex-col items-center justify-start">
      <Routes>
        <Route
          path="/"
          element={authUser && isEmailVerified ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/verify-email"
          element={<VerifyEmailPage />}
        />
        <Route
          path="/verify/:token"
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
