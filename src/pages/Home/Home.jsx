import axios from "axios";
import { useEffect, useState } from "react"
import './Home.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


export default function Home({carrito, setCarrito}) {

  const [productos, setProductos] = useState([]);
  const [imagenIndex, setImagenIndex] = useState(0);

  useEffect(() => {
    axios
    .get('https://684710407dbda7ee7ab15b61.mockapi.io/productos')
    .then((res) =>{
      console.log(res.data)
      setProductos(res.data)
    })
    .catch((err) => {
      console.error("Error al obtejner productos:", err)
    })
  }, [])

  function agregarAlCarrito(producto) {

  const yaExiste = carrito.find((item) => item.id === producto.id);

  if (yaExiste) {
    Swal.fire({
      icon: 'info',
      title: 'Ya está en el carrito',
      text: `${producto.nombre} ya fue agregado.`,
      timer: 1800,
      showConfirmButton: false,
    });
    return;
  }

  setCarrito([...carrito, producto]);

  Swal.fire({
    icon: 'success',
    title: 'Agregado al carrito',
    text: `${producto.nombre} fue añadido correctamente.`,
    timer: 1800,
    showConfirmButton: false,
  });
}

const imagenesBanner = [
  "/imagenes/Joyas-1.jpg",
  "/imagenes/Joyas-2.jpg",
  "/imagenes/Joyas-3.jpg",
  "/imagenes/Joyas-4.jpg",
  "/imagenes/Joyas-5.jpg",
  "/imagenes/Joyas-6.jpg",
  "/imagenes/Joyas-7.jpg",
  "/imagenes/Joyas-8.jpg",
];

useEffect(() => {
  const intervalo = setInterval(() => {
    setImagenIndex((prevIndex) => (prevIndex + 1) % imagenesBanner.length);
  }, 4000);

  return () => clearInterval(intervalo);
}, []);

console.log(productos)

productos.forEach(p => {
  console.log("Producto:", p.nombre, "ID:", p.id);
});

  return (
    <>

    <section
  className="banner"
  style={{
    backgroundImage: `url(${imagenesBanner[imagenIndex]})`,
  }}
>
  <h1>BIENVENIDOS A MAC'JEWELRY</h1>
</section>

    <section className="about">
  <div className="container-about">
    <h2 className="title-a-us">Sobre Nosotros</h2>

    <div className="about-images">
      <img className="imagen-about" src="/imagenes/Taller-1.jpg" alt="" />
      <img className="imagen-about" src="/imagenes/Taller-2.jpg" alt="" />
      <img className="imagen-about" src="/imagenes/Taller-3.jpg" alt="" />
      <img className="imagen-about" src="/imagenes/Taller-4.jpg" alt="" />
    </div>

    <div className="about-description">
      <p>
        En MAC'JEWELRY, creemos que cada joya cuenta una historia. Nacimos con la pasión por el arte y la tradición de la joyería artesanal, creando piezas únicas que reflejan elegancia, identidad y belleza en cada detalle.
    
        Cada una de nuestras creaciones es elaborada a mano con materiales de la más alta calidad, combinando técnicas tradicionales con diseños modernos e innovadores.
        
        Nuestro compromiso es ofrecer piezas exclusivas y atemporales, hechas con amor y dedicación, para acompañarte en los momentos más especiales de tu vida.
      </p>
    </div>
  </div>
</section>

    <section className="home-productos">
      <h1>PRODUCTOS DISPONIBLES</h1>

      <div className="grid-productos">

        {productos.map((producto) => (
  <div key={producto.id} className="card-producto">
    <img src={producto.imagen} alt={producto.nombre} />
    <h3>{producto.nombre}</h3>
    <p>{producto.descripcion}</p>
    <p className="precio">$ {producto.precio}</p>

    <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>

    <Link to={`/producto/${producto.id}`}>
      <button>Ver más</button>
    </Link>
  </div>
))}
      </div>
    </section>

    <section className="services">
  <div className="service-card">
    <i className="fa-solid fa-truck" />
    <h3>Entrega a Domicilio</h3>
    <p>Contamos con personal calificado y experiencia en entregas a nivel nacional.</p>
  </div>
  <div className="service-card">
    <i className="fa-solid fa-cart-shopping" />
    <h3>Compra Segura</h3>
    <p>Selecciona tus productos favoritos y obtén calidad garantizada.</p>
  </div>
  <div className="service-card">
    <i className="fa-solid fa-shield-halved" />
    <h3>Garantía Post Venta</h3>
    <p>Incluye mantenimiento y ofertas en nuestras nuevas colecciones.</p>
  </div>
</section>
    </>
    
  );
}