import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './ProductDetail.css';

export default function ProductDetail({ agregarAlCarrito }) {
  const { id } = useParams(); // 👈 importante
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios
      .get(`https://684710407dbda7ee7ab15b61.mockapi.io/productos/${id}`)
      .then((res) => setProducto(res.data))
      .catch((err) => console.error("Error al cargar detalle:", err));
  }, [id]);

  if (!producto) return <p className="cargando">Cargando producto...</p>;

  return (
    <section className="productos-container">
      <div className='title-producto'>
        <h1>PRODUCTO</h1>
      </div>

      <div className='productos'>
        <div className='imagen-producto'>
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
      </div>

      <div className='caracteristicas-producto'>
        <h2>{producto.nombre}</h2>
        <span><strong>Precio:</strong> ${producto.precio}</span>
        <span><strong>Color:</strong> {producto.color || "Amarillo"}</span>
        <span><strong>Metal:</strong> {producto.metal || "Oro 18k"}</span>
        <span><strong>Acabado:</strong> {producto.acabado || "Brillo espejo"}</span>
        <span><strong>Piedra:</strong> {producto.piedra || "Swarovski cúbico"}</span>
      </div>

      <div className='buttons-container'>
        {agregarAlCarrito && (
  <button onClick={() => agregarAlCarrito(producto)}>AGREGAR</button>
)}
        <button>COMPRAR</button>
      </div>

      <div className="descripcion-producto">
        <h2>DESCRIPCIÓN</h2>
        <p>{producto.descripcion}</p>
      </div>
    </section>
  );
}
