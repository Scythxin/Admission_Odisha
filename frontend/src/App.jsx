import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import { EnquiryProvider } from "./context/EnquiryContext";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("User already logged in");
    }
  }, []);

  return (
    <AuthProvider>
      <EnquiryProvider>
        <AppRoutes />
      </EnquiryProvider>
    </AuthProvider>
  );
}

export default App;