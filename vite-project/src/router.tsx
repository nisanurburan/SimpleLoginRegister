// src/router.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { getToken } from "./services/authServices";
import { isTokenExpired } from "./utils/jwtUtils";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div>Welcome</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
