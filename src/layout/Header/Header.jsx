
export default function Header() {
  return (
        <nav>
  <input type="checkbox" id="check" />
  <label htmlFor="check" className="checkbtn">
    <i className="fi fi-br-menu-burger" />
  </label>
  <a href="#" className="enlace">
    <img
      src="/assets/imagenes/LOGO-mac'jewelry.png"
      alt="Logo"
      className="logo"
    />
  </a>
  <ul className="nav-list">
    <li>
      <a className="principal-nav" href="/pages/principal/principal.html">
        Principal
      </a>
    </li>
    <li>
      <a href="/pages/registro/registro.html">Registro</a>
    </li>
    <li>
      <a href="/pages/contacto/contacto.html">Contacto</a>
    </li>
    <li>
      <a href="/pages/empresa/nuestra-empresa.html">Nuestra Empresa</a>
    </li>
    <li>
      <a href="/pages/admin/admin-productos.html">Admin Productos</a>
    </li>
    <li>
      <a href="/pages/productos/productos-detallados.html">Productos</a>
    </li>
  </ul>
  <div className="header-user">
    <i className="fi fi-br-shopping-cart" />
    <i className="fi fi-br-user" />
  </div>
</nav>
  )
}
