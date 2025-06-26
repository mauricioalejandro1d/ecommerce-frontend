import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Register from './pages/Register/Register';
import AdminProduct from './pages/AdminProduct/AdminProduct';
import AdminContact from './pages/AdminContact/AdminContact';
import { useState } from 'react';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Productos from "./pages/Productos/Productos"
import AdminUsuarios from "./pages/AdminUsuarios/AdminUsuarios";

export default function App() {
  const [carrito, setCarrito] = useState([]);

   const agregarAlCarrito = (producto) => {
    if (carrito.find((item) => item.id === producto.id)) return;
    setCarrito([...carrito, producto]);
  };

  return (
    <div className="app-layout">
      <Header carritoTotal={carrito.length} />
      <main className="main-container">
        <Routes>
  <Route path="/" element={<Home carrito={carrito} setCarrito={setCarrito} />} />
  <Route path="/nuestra-empresa" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/register" element={<Register />} />
  <Route path="/admin-productos" element={<AdminProduct />} />
  <Route path="/admin-contactos" element={<AdminContact />} />
  <Route path="/producto/:id" element={<ProductDetail agregarAlCarrito={agregarAlCarrito} />} />
  <Route path="/productos" element={<Productos />} />
  <Route path="/admin-usuarios" element={<AdminUsuarios />} />
</Routes>
      </main>
      <Footer />
    </div>
  );
}