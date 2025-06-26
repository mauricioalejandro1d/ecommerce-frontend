import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AdminUsuarios.css";
import { useForm } from "react-hook-form";

const URL = "https://684710407dbda7ee7ab15b61.mockapi.io/usuarios"

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([])
    const [edicion, setEdicion] = useState(false)
    const [usuarioActual, setUsuarioActual] = useState(null)


    useEffect(() => {
        obtenerUsuarios()
    }, [])

    const obtenerUsuarios = () => {
        axios
        .get(`${URL}`)
        .then((response) => setUsuarios(response.data))
        .catch((error) => console.error("Error al obtener Usuarios:", error))
    }

    const eliminarUsuario = (id) => {
        Swal.fire({
  title: "Estas seguro(a)",
  text: "Después de aceptar no hay marcha atrás!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    axios
    .delete(`https://684710407dbda7ee7ab15b61.mockapi.io/usuarios/${id}`)
    .then(() => {
        obtenerUsuarios()
        Swal.fire({
      title: "Deleted!",
      text: "Eliminado satisfactoriamente.",
      icon: "success"
    });
    })
    .catch((error) => {
        console.error("Error al eliminar usuario:", error)
        Swal.fire({
  icon: "error",
  title: "Oops... no se pudo eliminar el usuario",
});
    })
    
}
});
}

const editarUsuario = (usuario) => {
    setEdicion(true);
    setUsuarioActual(usuario);

    setValue("nombre", usuario.nombre);
    setValue("apellido", usuario.apellido);
    setValue("email", usuario.email);
    setValue("rol", usuario.rol);
    setValue("fecha", usuario.fecha);
  };

 const agregarUsuario = (datos) => {
    axios
      .post("https://684710407dbda7ee7ab15b61.mockapi.io/usuarios", datos)
      .then(() => {
        obtenerUsuarios();
        Swal.fire("Usuario creado", "Se ha creado correctamente", "success");
      })
      .catch((err) => {
        console.error("Error al crear usuario:", err);
        Swal.fire("Error", "No se pudo crear el usuario", "error");
      });
  };

 const actualizarUsuario = (datos) => {
    axios
      .put(`https://684710407dbda7ee7ab15b61.mockapi.io/usuarios/${usuarioActual.id}`, datos)
      .then(() => {
        obtenerUsuarios();
        setEdicion(false);
        setUsuarioActual(null);
        Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
      })
      .catch((err) => {
        console.error("Error al actualizar usuario:", err);
        Swal.fire("Error", "No se pudo actualizar el usuario", "error");
      });
  };
const { register, handleSubmit, formState: { errors }, reset } = useForm();


   return (
    <section className="admin-section">
      <h1>Administración de Usuarios</h1>


      <table className="admin-table">
        <tbody>
           {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                {new Date(usuario.fecha).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td>
                <button className="btn-eliminar" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                   <button className="btn-editar" onClick={() => editarUsuario(usuario)}>Edita</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit(edicion ? actualizarUsuario : agregarUsuario)}
        className="form-producto">
           <h2>{edicion ? "Editar usuario" : "Agregar nuevo usuario"}</h2>

        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: "Nombre requerido" })}
        />
        {errors.nombre && <p className="error-text">{errors.nombre.message}</p>}

        <input
          type="text"
          placeholder="Apellido"
          {...register("apellido", { required: "Apellido requerido" })}
        />
        {errors.apellido && <p className="error-text">{errors.apellido.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email requerido" })}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <select {...register("rol", { required: "Selecciona un rol" })}>
          <option value="">Selecciona un rol</option>
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
        {errors.rol && <p className="error-text">{errors.rol.message}</p>}

        <input
          type="date"
          {...register("fecha", { required: "Fecha requerida" })}
        />
        {errors.fecha && <p className="error-text">{errors.fecha.message}</p>}

        <input type="submit" value={edicion ? "Actualizar usuario" : "Crear usuario"} />
      </form>
    </section>
  );
}
