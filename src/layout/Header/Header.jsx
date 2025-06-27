import { NavLink } from 'react-router-dom'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';



export default function Header({ carritoTotal = 0 }) {
  return (
   <header>
  <nav>
    <input type="checkbox" id="check" />
    
    <label htmlFor="check" className="checkbtn">
      <FontAwesomeIcon icon={faBars} />
    </label>
    
    <a href="#" className="enlace">
      <img src="/imagenes/LOGO-macjewelry.png" alt="Logo" className="logo" />
    </a>

    <ul className="nav-list">
      <li><NavLink to="/" className="principal-nav">Principal</NavLink></li>
      <li><NavLink to="/register">Registro</NavLink></li>
      <li><NavLink to="/contact">Contacto</NavLink></li>
      <li><NavLink to="/nuestra-empresa">Nuestra Empresa</NavLink></li>
      <li><NavLink to="/admin-productos">Admin Productos</NavLink></li>
      <li><NavLink to="/productos">Productos</NavLink></li>
      <li><NavLink to="/admin-usuarios">Admin Usuarios</NavLink></li>
    </ul>

    <div className="header-user">
      <FontAwesomeIcon icon={faShoppingCart} />
      {carritoTotal > 0 && <span className="carrito-contador">{carritoTotal}</span>}
      <FontAwesomeIcon icon={faUser} />
    </div>
  </nav>
</header>

  )
}
