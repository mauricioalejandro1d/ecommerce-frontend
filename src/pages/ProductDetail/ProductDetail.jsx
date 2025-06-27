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
  "Oro Vivo": "Fundido en la pureza del oro de 18k, este anillo fluye como un río de elegancia sobre tu piel; Un anillo forjado a mano en oro de 18 K, con volúmenes suaves que evocan la fluidez del metal en su estado más puro. Su diseño minimalista pero lleno de vida representa la conexión del creador con la materia prima. Una pieza que transmite calidez y sofisticación sin necesidad de piedra.",

  "Hilo de Sol": "Cada curva tejida representa el amanecer dorado, con destellos suaves que abrazan tu alma; Este anillo finamente mallado a mano entrelaza líneas de oro 18 K que parecen capturar los primeros rayos del amanecer. Una delicada piedra Swarovski clara, colocada estratégicamente, refleja la luz como un sol diminuto, aportando un brillo sereno y optimista.",

  "Forja del Tiempo": "Inspirado en la historia, grabado a mano con fuerza ancestral, una pieza que resiste el tiempo; Forjado artesanalmente, este anillo lleva en su forma un rumbo clásico y atemporal. Fecho a golpes sutiles que acentúan su carácter rústico, luce un ámbar natural pulido: una ventana a historias ancestrales, grabadas en este anillo rico en tradición y misticismo.",

  "Esencia Dorada": "Espejo de tu interior, esta joya refleja no solo la luz, sino lo más profundo de tu esencia; Pulido espejo a mano, como si se trabajara hasta capturar el alma del metal. Este anillo de oro 18 K refleja luz y sentimientos. En su centro, un zafiro claro le añade sofisticación y distinción, conjurando elegancia pura y delicadeza eterna.",

  "Raíces Sagradas": "Una conexión con la tierra hecha oro, cada trazo narra tus raíces y tu espiritualidad; Grabado cuidadosamente con herramientas artesanales, este anillo cuenta una historia ancestral mediante líneas que evocan raíces profundas. Está fabricado en oro 18 K y engalana su diseño con un cuarzo rústico: un amuleto lleno de autenticidad y memoria.",

  "Alma Infinita": "El símbolo del infinito convertido en oro: eterno como el amor verdadero; Sus curvas en forma de infinito simbolizan unión, equilibrio y eternidad. Moldeado por manos expertas en oro 18 K, este anillo sostiene un pequeño Swarovski, brillando como la promesa perpetua del compromiso y del alma compartida.",

  "Brisa Dorada": "Diseño ondulado como el viento que acaricia tu piel en un día dorado; Su estructura fluida y ondulada, creada a mano, recuerda la danza suave del viento sobre el metal. El oro amarillo cálido se desliza en volutas ligeras, sin piedra, abrazando minimalismo y elegancia con un toque de naturaleza en movimiento.",

  "Círculo Místico": "Un anillo con geometría sagrada que honra el universo y tu lugar en él; Tallado a mano con formas geométricas rústicas, en oro 18 K que irradia simbolismo universal. Añade una pequeña esmeralda sutil, cuya presencia aporta un toque de misterio y profundidad espiritual a este anillo cargado de armonía cósmica."
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
