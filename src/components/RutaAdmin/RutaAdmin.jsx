import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function RutaAdmin({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Cargando...</p>;

  if (!user || user.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
