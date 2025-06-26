import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AdminProduct.css";
import FormProduct from "../../components/FormProduct/FormProduct";

export default function AdminProduct() {
  const [productos, setProductos] = useState([]);
  const [edicion, setEdicion] = useState(false);
const [productoActual, setProductoActual] = useState(null);


  useEffect(() => {
    obtenerProductos();
  }, []);

  const actualizarProducto = (datos) => {
    axios
    .put(`https://684710407dbda7ee7ab15b61.mockapi.io/productos/${productoActual.id}`, datos)
    .then(() =>{
      obtenerProductos()
      setEdicion(false)
      setProductoActual(null)

      Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Actualizado perfectamente",
  text: "El producto fue actualizado de manera exitosa",
  timer: 1500
});
    })
  }

  const editarProducto = (producto) => {
    setEdicion(true)
    setProductoActual(producto)
  }

  const obtenerProductos = () => {
    axios
      .get("https://684710407dbda7ee7ab15b61.mockapi.io/productos")
      .then((response) => setProductos(response.data))
      .catch((error) => console.error("Error al obtener productos:", error));
  };

  const eliminarProducto = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9f7a49",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://684710407dbda7ee7ab15b61.mockapi.io/productos/${id}`)
          .then(() => {
            setProductos((prev) => prev.filter((producto) => producto.id !== id));
            Swal.fire("Eliminado", "El producto fue eliminado.", "success");
          })
          .catch((error) => {
            console.error("Error al eliminar producto:", error);
            Swal.fire("Error", "No se pudo eliminar el producto.", "error");
          });
      }
    });
  };

  const agregarProducto = (datos) => {
   if (!datos.nombre || !datos.descripcion || !datos.precio || !datos.imagen) {
      Swal.fire("Campos incompletos", "Por favor completa todos los campos.", "warning");
      return;
    }

    axios
      .post("https://684710407dbda7ee7ab15b61.mockapi.io/productos", datos)
      .then(() => {
        obtenerProductos();
        Swal.fire("Producto agregado", "¡Tu producto fue creado exitosamente!", "success");
      })
      .catch((error) => {
        console.error("Error al agregar producto:", error);
        Swal.fire("Error", "No se pudo agregar el producto", "error");
      });
  };

  return (
    <section className="admin-section">
      <h1>Administrador de Productos</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Fecha de Creación</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                {producto.imagen ? (<img src={producto.imagen} alt={producto.nombre} className="img-previa" />) : (<span style={{ color: 'gray' }}>Sin imagen</span>)}
              </td>
<td>{producto.nombre || "Sin nombre"}</td>
<td>${producto.precio || "0"}</td>
<td>{producto.categoria || "No asignada"}</td>
<td>{producto.fecha || "Sin fecha"}</td>
              <td>
                <button className="btn-editar" onClick={() => editarProducto(producto)}>Editar</button>
                <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormProduct 
      agregarProducto={agregarProducto}
      edicion={edicion}
      productoActual={productoActual}
      actualizarProducto={actualizarProducto} />
    </section>
  );
}
