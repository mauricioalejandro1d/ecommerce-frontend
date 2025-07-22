import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Header({ carritoTotal = 0 }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <nav>
        <input type="checkbox" id="check" />

        <label htmlFor="check" className="checkbtn">
          <FontAwesomeIcon icon={faBars} />
        </label>

        <Link to="/" className="enlace">
          <img src="/imagenes/LOGO-macjewelry.png" alt="Logo" className="logo" />
        </Link>

        <ul className="nav-list">
          <li><NavLink to="/" className="principal-nav">Principal</NavLink></li>
          <li><NavLink to="/register">Registro</NavLink></li>
          <li><NavLink to="/contact">Contacto</NavLink></li>
          <li><NavLink to="/nuestra-empresa">Nuestra Empresa</NavLink></li>
          <li><NavLink to="/productos">Productos</NavLink></li>

          {user?.rol === 'admin' && (
            <>
              <li><NavLink to="/admin-productos">Admin Productos</NavLink></li>
              <li><NavLink to="/admin-usuarios">Admin Usuarios</NavLink></li>
              <li><NavLink to="/admin-ordenes">Órdenes Admin</NavLink></li>
            </>
          )}
        </ul>

        <div className="header-user">
          <Link to="/carrito" className="header-cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            {carritoTotal > 0 && (
              <span className="carrito-contador">{carritoTotal}</span>
            )}
          </Link>

          <FontAwesomeIcon icon={faUser} />

          {user && (
            <button onClick={handleLogout} className="logout-btn">
              Cerrar sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
