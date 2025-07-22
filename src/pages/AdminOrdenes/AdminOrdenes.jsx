
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./AdminOrdenes.css";

export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axiosInstance.get("/ordenes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrdenes(res.data);
      } catch (error) {
        console.error("Error al cargar órdenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  const actualizarEstado = async (idOrden, nuevoEstado) => {
    try {
      const token = localStorage.getItem("token");

      await axiosInstance.put(
        `/ordenes/${idOrden}/estado`,
        { estado: nuevoEstado },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrdenes((prev) =>
        prev.map((orden) =>
          orden._id === idOrden ? { ...orden, estado: nuevoEstado } : orden
        )
      );
    } catch (err) {
      console.error("Error al actualizar orden:", err);
      alert("No se pudo cambiar el estado de la orden.");
    }
  };

  if (loading) return <p>Cargando órdenes...</p>;

  if (ordenes.length === 0) {
    return (
      <section className="ordenes-vacio">
        <h2>No hay órdenes registradas</h2>
      </section>
    );
  }

  return (
    <section className="admin-ordenes">
      <h1>📦 Órdenes del sistema</h1>

      <ul className="ordenes-lista">
        {ordenes.map((orden) => (
          <li key={orden._id} className="orden-item">
            <div className="orden-header">
              <h3>Orden #{orden._id.slice(-6).toUpperCase()}</h3>
              <p><strong>Usuario:</strong> {orden.usuario?.nombre || "Desconocido"}</p>
              <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleDateString("es-ES")}</p>
              <p><strong>Estado:</strong> {orden.estado}</p>
            </div>

            <div className="orden-productos">
              <h4>Productos:</h4>
              <ul>
                {orden.productos.map((prod) => (
                  <li key={prod._id}>
                    🪙 <strong>{prod.nombre}</strong> - ${prod.precio}
                  </li>
                ))}
              </ul>
            </div>

            <div className="orden-total">
              <strong>Total:</strong> ${orden.total}
            </div>

            <div className="orden-acciones">
              {orden.estado === "pendiente" && (
                <>
                  <button onClick={() => actualizarEstado(orden._id, "completado")}>
                    ✅ Marcar como Completado
                  </button>
                  <button onClick={() => actualizarEstado(orden._id, "cancelado")}>
                    ❌ Cancelar orden
                  </button>
                </>
              )}
              {orden.estado === "completado" && <p className="estado completado">✔ Completado</p>}
              {orden.estado === "cancelado" && <p className="estado cancelado">✖ Cancelado</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
