import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("https://684710407dbda7ee7ab15b61.mockapi.io/productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <section className="productos-section">
      <h1 className="titulo-productos">NUESTRAS JOYAS</h1>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <h2>{producto.nombre}</h2>
            <p className="precio">$ {producto.precio}</p>
            <p className="resumen">{producto.descripcion.slice(0, 100)}...</p>
            <Link to={`/producto/${producto.id}`}>
              <button className="btn-vermas">Ver más</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}