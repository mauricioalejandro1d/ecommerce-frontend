import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebookF,
  faTiktok,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
  return (
    <>
    <footer className="footer-container">
  <div className="footer-redes">
  <h3>Conecta con Nosotros</h3>
  <ul>
    <li><FontAwesomeIcon icon={faGoogle} /></li>
    <li><FontAwesomeIcon icon={faFacebookF} /></li>
    <li><FontAwesomeIcon icon={faInstagram} /></li>
    <li><FontAwesomeIcon icon={faTiktok} /></li>
  </ul>
</div>

  <div className="footer-logo">
    <img src="/public/imagenes/LOGO-macjewelry.png" alt="Logo" />
    <p>Copyright © 2025 CAM'JEWELRY</p>
  </div>

  <div className="footer-contact">
        <div className="informacion-f-">
          <h3>Información</h3>
          <p>Detalles de Compras</p>
          <p>Política de Privacidad</p>
          <p>Términos y Condiciones</p>
        </div>
        <div>
          <h3 className="dirrecion-f-">Dirección</h3>
          <p>No: 58 A, Tullumayu 1-000, Perú, Cusco 8001</p>
          <p>000 - 123 - 456789</p>
          <p>cam.jewelry@gmail.com</p>
        </div>
      </div>
    </footer>

    </>
   
  )
}
