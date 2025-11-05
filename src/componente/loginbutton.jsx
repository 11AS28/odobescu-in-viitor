import React from "react";
import { login, logout, auth } from "../folos/firebase2";

export default function LoginButton() {
  const handleLogin = async () => {
    const user = await login();
    if (user) {
      console.log("User logged in:", user.displayName);
    }
  };

  const handleLogout = async () => {
    await logout();
    console.log("User logged out");
  };

  return (
    <div>
      {auth.currentUser ? (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Login cu Google
        </button>
      )}
    </div>
  );
}
