import { createContext, useState, useEffect } from "react";
import API_BASE from "../config/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
  }
}, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = async () => {
  const token = localStorage.getItem("token");

  await fetch(`${API_BASE}?r=auth/logout`, {
    method: "POST",
    headers: {
      Authorization: token
    }
  });

  localStorage.removeItem("token");
  setToken(null); // 🔥 IMPORTANT
};

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;