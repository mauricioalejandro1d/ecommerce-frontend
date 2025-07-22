import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import './MisOrdenes.css'

export default function MisOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axiosInstance.get("/ordenes/mis-ordenes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
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

  if (loading) return <p>Cargando historial de órdenes...</p>;

  if (ordenes.length === 0) {
    return (
      <section className="ordenes-vacio">
        <h2>🛒 No tienes órdenes realizadas aún</h2>
        <p>¡Empieza a comprar tus joyas favoritas!</p>
      </section>
    );
  }

  const cancelarOrden = async (idOrden) => {
    try {
      const token = localStorage.getItem('token');

      await axiosInstance.put(`/ordenes/${idOrden}/estado`, 
        { estado: 'cancelado' }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setOrdenes(prev =>
        prev.map(orden =>
          orden._id === idOrden ? { ...orden, estado: 'cancelado' } : orden
        )
      );
    } catch (err) {
      console.error("Error al cancelar orden:", err);
      alert("Error al cancelar la orden.");
    }
  };

  const marcarComoCompletada = async (idOrden) => {
    try {
      const token = localStorage.getItem('token');

      await axiosInstance.put(`/ordenes/${idOrden}/estado`, 
        { estado: 'completado' }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setOrdenes(prev =>
        prev.map(orden =>
          orden._id === idOrden ? { ...orden, estado: 'completado' } : orden
        )
      );
    } catch (err) {
      console.error("Error al actualizar orden:", err);
      alert("Error al actualizar el estado de la orden.");
    }
  };

  return (
    <section className="mis-ordenes">
      <h1>📦 Mis Órdenes</h1>

      <ul className="ordenes-lista">
        {ordenes.map((orden) => (
          <li key={orden._id} className="orden-item">
            <div className="orden-header">
              <h3>Orden #{orden._id.slice(-6).toUpperCase()}</h3>
              <p><strong>Fecha:</strong> {new Date(orden.createdAt).toLocaleDateString("es-ES")}</p>
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

            <p>
              <strong>Estado:</strong>{" "}
              <span className={`estado ${orden.estado}`}>
                {orden.estado === 'pendiente'
                  ? 'Pendiente'
                  : orden.estado === 'completado'
                  ? 'Completado'
                  : 'Cancelado'}
              </span>
            </p>

            {orden.estado === 'pendiente' && (
              <>
                <button onClick={() => marcarComoCompletada(orden._id)}>
                  ✅ Marcar como Completada
                </button>
                <button onClick={() => cancelarOrden(orden._id)}>
                  ❌ Cancelar orden
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
