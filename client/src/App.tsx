import "./App.css";
import QueryProvider from "./lib/QueryProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ProtectedRoutePath, PublicRoutePath } from "./components/RoutePath";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { DashboardPage } from "./pages/product/Dashboard";
import AllLeads from "./pages/product/Leads";

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: {
              style: {
                background: "#f0fdf4",
                color: "#166534",
                border: "1px solid #bbf7d0",
              },
              iconTheme: { primary: "#22c55e", secondary: "#f0fdf4" },
            },
            error: {
              style: {
                background: "#fef2f2",
                color: "#991b1b",
                border: "1px solid #fecaca",
              },
              iconTheme: { primary: "#ef4444", secondary: "#fef2f2" },
            },
          }}
        />
        <Routes>
          <Route element={<PublicRoutePath />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoutePath />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/leads" element={<AllLeads />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
