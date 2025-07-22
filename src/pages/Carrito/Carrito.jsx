import { useOrder } from '../../context/OrderContext';
import './Carrito.css';
import axiosInstance from '../../api/axiosInstance';

export default function Carrito() {
  const { cart, removeItemFromCart, clearCart } = useOrder();

  const total = cart.reduce((sum, item) => sum + Number(item.precio), 0);


  const realizarOrden = async () => {
    try {
      const token = localStorage.getItem('token');
      const productos = cart.map(p => p.id);

      const orden = {
        productos,
        direccion: {
          calle: "Av. Primavera 123",
          ciudad: "Cusco",
          pais: "Perú",
          postal: "08000"
        },
        total
      };

      await axiosInstance.post('/ordenes', orden, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Orden realizada con éxito ✅");
      clearCart();
    } catch (err) {
      console.error("Error al crear orden:", err);
      alert("Hubo un error al realizar la orden ❌");
    }
  };

  if (cart.length === 0) {
    return (
      <section className="carrito-vacio">
        <h2>Tu carrito está vacío 🛒</h2>
        <p>Agrega productos para comenzar tu compra.</p>
      </section>
    );
  }

  return (
    <section className="carrito-container">
      <h1>🛍 Tu Carrito</h1>

      {/* Lista de productos */}
      <ul className="carrito-lista">
        {cart.map((producto) => (
          <li key={producto.id} className="carrito-item">
            <img src={producto.imagen} alt={producto.nombre} />
            <div>
              <h3>{producto.nombre}</h3>
              <p><strong>Precio:</strong> ${producto.precio}</p>
              <p><strong>Metal:</strong> {producto.metal}</p>
              <button onClick={() => removeItemFromCart(producto.id)}>❌ Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total y acciones */}
      <div className="carrito-total">
        <h3>Total a pagar: <span>${total}</span></h3>
        <button onClick={realizarOrden} className="btn-confirmar">Confirmar orden</button>
      </div>
    </section>
  );
}
