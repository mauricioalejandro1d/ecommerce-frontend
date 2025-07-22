import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { useState } from 'react';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Productos from './pages/Productos/Productos';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Login from './pages/Login/Login';
import Carrito from './pages/Carrito/Carrito';
import AdminUsuarios from './pages/AdminUsuarios/AdminUsuarios';
import MisOrdenes from './pages/MisOrdenes/MisOrdenes';
import AdminProduct from './pages/AdminProduct/AdminProduct';
import AdminContact from './pages/AdminContact/AdminContact';
import AdminOrdenes from './pages/AdminOrdenes/AdminOrdenes';
import PrivateRoute from './routes/PrivateRoute';
import RutaAdmin from './components/RutaAdmin/RutaAdmin.jsx';
import axiosInstance from './api/axiosInstance.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';

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
          <Route path="/contact" element={<Contact />} />
          <Route path="/nuestra-empresa" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/producto/:id" element={<ProductDetail agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/mis-ordenes" element={<PrivateRoute><MisOrdenes /></PrivateRoute>} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin-contactos" element={
            <RutaAdmin><AdminContact /></RutaAdmin>
          } />
          <Route path="/admin-usuarios" element={
            <RutaAdmin><AdminUsuarios /></RutaAdmin>
          } />
          <Route path="/admin-productos" element={<AdminProduct />} />
          <Route path="/admin-ordenes" element={
            <RutaAdmin><AdminOrdenes /></RutaAdmin>
          } />

          <Route path="/admin" element={
  <ProtectedRoute role="admin">
    <AdminDashboard />
  </ProtectedRoute>
} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
