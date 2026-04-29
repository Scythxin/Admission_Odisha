import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("User already logged in");
    }
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;