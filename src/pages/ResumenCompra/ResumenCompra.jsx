import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ResumenCompra({ carrito }) {
  const { token } = useContext(AuthContext);

  const handleComprar = async () => {
    const total = carrito.reduce((acc, item) => acc + item.precio * (item.cantidad || 1), 0);
    const productos = carrito.map(p => ({
      productoId: p.id,
      nombre: p.nombre,
      precio: p.precio,
      cantidad: p.cantidad || 1,
    }));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ordenes",
        { productos, total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Orden enviada con éxito");
    } catch (error) {
      alert("❌ Error al enviar orden");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Resumen de compra</h2>
      <button onClick={handleComprar}>FINALIZAR COMPRA</button>
    </div>
  );
}
