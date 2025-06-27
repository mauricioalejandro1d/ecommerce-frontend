import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetail.css";

export default function ProductDetail({ agregarAlCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios
      .get(`https://684710407dbda7ee7ab15b61.mockapi.io/productos/${id}`)
      .then((res) => setProducto(res.data))
      .catch((err) => console.error("Error al cargar detalle:", err));
  }, [id]);

  if (!producto) return <p className="cargando">Cargando producto...</p>;

  const descripcionesExtras = {
  "Oro Vivo": "Fundido en la pureza del oro de 18k, este anillo fluye como un río de elegancia sobre tu piel.",
  "Hilo de Sol": "Cada curva tejida representa el amanecer dorado, con destellos suaves que abrazan tu alma.",
  "Forja del Tiempo": "Inspirado en la historia, grabado a mano con fuerza ancestral, una pieza que resiste el tiempo.",
  "Esencia Dorada": "Espejo de tu interior, esta joya refleja no solo la luz, sino lo más profundo de tu esencia.",
  "Raíces Sagradas": "Una conexión con la tierra hecha oro, cada trazo narra tus raíces y tu espiritualidad.",
  "Alma Infinita": "El símbolo del infinito convertido en oro: eterno como el amor verdadero.",
  "Brisa Dorada": "Diseño ondulado como el viento que acaricia tu piel en un día dorado.",
  "Círculo Místico": "Un anillo con geometría sagrada que honra el universo y tu lugar en él."
};

const descripcionLujosa = descripcionesExtras[producto.nombre] || producto.descripcion;


  return (
    <section className="detalle-producto">
      <div className="detalle-hero">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>

      <div className="detalle-info">
        <h1 className="nombre">{producto.nombre}</h1>
        <p className="descripcion-principal">{descripcionLujosa}</p>

        <div className="detalle-datos">
          <ul>
            <li><strong>Precio:</strong> ${producto.precio}</li>
            <li><strong>Color:</strong> {producto.color}</li>
            <li><strong>Metal:</strong> {producto.metal}</li>
            <li><strong>Acabado:</strong> {producto.acabado}</li>
            <li><strong>Piedra:</strong> {producto.piedra}</li>
            <li><strong>Categoría:</strong> {producto.categoria}</li>
            <li><strong>Fecha de creación:</strong> {new Date(producto.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</li>
          </ul>
        </div>

        <div className="botones">
          <button onClick={() => agregarAlCarrito(producto)}>AGREGAR AL CARRITO</button>
          <button className="btn-comprar">COMPRAR AHORA</button>
        </div>
      </div>
    </section>
  );
}
