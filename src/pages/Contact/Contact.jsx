import FormContact from "../../components/FormContact/FormContact";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [contactos, setContactos] = useState([]);

  const agregarContacto = (datos) => {
    axios
  .post("https://684710407dbda7ee7ab15b61.mockapi.io/usuarios", {
    ...datos,
    tipo: "contacto"
  })
      .then((response) => {
        setContactos([...contactos, response.data]);
        Swal.fire({
          title: "BIEN HECHO!",
          text: "Se agregó el contacto correctamente",
          icon: "success",
          confirmButtonColor: "#9f7a49",
        });
      })
      .catch((error) => {
        console.error("No se pudo agregar el contacto:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal",
        });
      });
  };

  return (
    <section className="contact-container">
      <h1>CONTÁCTANOS</h1>
      <FormContact agregarContacto={agregarContacto} />
    </section>
  );
}