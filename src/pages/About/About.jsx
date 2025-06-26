import './About.css';

export default function About() {
  return (
    <section className="about-container">
      <h1 className="s-n">SOBRE NOSOTROS</h1>

      <div className="sobre-nosotros">
        <div className="texto-s-n">
          <h1>EXTRAORDINARIOS ESTILOS DE JOYAS</h1>
          <h2>Calidad y acabados perfectos garantizados</h2>
          <p>
            En nuestra joyería artesanal, cada pieza es una obra de arte diseñada
            con pasión y precisión. Fusionamos técnicas tradicionales con diseños
            innovadores para crear joyas únicas que reflejan elegancia y
            personalidad. <br /> <br />
            Trabajamos con materiales de primera calidad y un meticuloso proceso de
            elaboración para garantizar acabados impecables. Cada joya es creada con
            el máximo cuidado, asegurando belleza, durabilidad y exclusividad en
            cada detalle.
          </p>
        </div>

        <div className="imagen-s-n">
  <img src="/imagenes/img-sobre-nosotros.jpg" alt="Sobre Nosotros" />
</div>
      </div>

      <div className="info-s-n">
        <h2>NUESTRO VIAJE HASTA AHORA...</h2>

        <div className="historia-s-n">
          <div className="h3-s-n">
            <i className="fa-solid fa-arrows-to-dot" />
            <h3>Nuestra historia</h3>
            <p>
              Desde 2020, en MAC'JEWELRY nos dedicamos a la creación de joyería
              artesanal de alta calidad, combinando tradición y diseño
              contemporáneo.
            </p>
          </div>

          <div className="h3-s-n">
            <i className="fa-solid fa-pen-nib" />
            <h3>Nuestros Diseños Personalizados</h3>
            <p>
              Cada joya cuenta una historia, y en MAC'JEWELRY hacemos que la tuya
              cobre vida con creatividad, materiales de alta calidad y acabados perfectos.
            </p>
          </div>

          <div className="h3-s-n">
            <i className="fa-solid fa-users-gear" />
            <h3>Nuestro Equipo</h3>
            <p>
              Un equipo apasionado y experto, dedicado a la creación de joyería artesanal
              de primera calidad.
            </p>
          </div>
        </div>
      </div>

      <div className="desarrollador">
        <h2>DESARROLLADOR DEL PROYECTO</h2>
        <div className="img-personal">
  <img src="/imagenes/img-personal.jpg" alt="Desarrollador" />
  <h3>Mauricio Carrasquel</h3>
</div>
      </div>
    </section>
  );
}
