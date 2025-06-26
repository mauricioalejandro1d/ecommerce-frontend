import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./AdminContact.css";



export default function AdminContact() {

  const [contactos, setContactos] = useState([])

  useEffect(() => {
    axios
    .get("https://684710407dbda7ee7ab15b61.mockapi.io/contactos")
    .then((res) => setContactos(res.data))
    .catch((err) => console.error("Error al recibircontacto:", err))
  }, [])



  const eliminarContacto = (id) => {
     Swal.fire({
    title: "¿Estás seguro que quieres eliminarlo?",
    text: "Una vez aceptes, no hay marcha atrás",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#9f7a49",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmo",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if(result.isConfirmed) {
      axios.delete(`https://684710407dbda7ee7ab15b61.mockapi.io/contactos/${id}`)
      .then(() => {
        setContactos(contactos.filter((contact) => contact.id !== id))
        Swal.fire({
  title: "Hecho, se eliminó el pcontacto satisfactoriamente!",
  text: "Todo correcto",
  icon: "success",
  draggable: true
});
      }).catch((error) => {
        console.error("No se pudo eliminar el contacto:", error)
      })
      Swal.fire({
  icon: "error",
  title: "Lastimosamente, no se pudo eliminar el contacto",
  text: "Sucedio algo malo",
});
    }
  })
  }



  return (
    <table className="admin-table">
  <thead>
    <tr>
      <th>NOMBRE</th>
      <th>APELLIDO</th>
      <th>EMAIL</th>
      <th>MENSAJE</th>
      <th>ELIMINAR</th>
    </tr>
  </thead>
  <tbody>
    {contactos.map((contacto) => (
      <tr key={contacto.id}>
        <td>{contacto.nombre}</td>
        <td>{contacto.apellido}</td>
        <td>{contacto.email}</td>
        <td>{contacto.mensaje}</td>
        <td>
          <button onClick={() => eliminarContacto(contacto.id)}>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  )
}

