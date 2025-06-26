import { useForm } from "react-hook-form";
import { useEffect } from "react"
import './FormProduct.css';

export default function FormProduct({ agregarProducto, edicion, productoActual, actualizarProducto }) {
  const { register, handleSubmit, reset, setValue, formState: {errors} } = useForm();

  const onSubmit = async (data) => {
  try {
    if (edicion && productoActual) {
      await actualizarProducto(data);
    } else {
      await agregarProducto(data);
    }
    reset();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo guardar el producto.",
    });
  }
};

  useEffect(() => {
  if (edicion && productoActual) {
    setValue("nombre", productoActual.nombre);
    setValue("descripcion", productoActual.descripcion);
    setValue("precio", productoActual.precio);
    setValue("imagen", productoActual.imagen);
    setValue("fecha", productoActual.fecha);
    setValue("categoria", productoActual.categoria);
  }
}, [edicion, productoActual, setValue]);

return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-producto">
  <h2>{edicion ? "Editar producto" : "Crear nuevo producto"}</h2>

      <input
        type="text"
        placeholder="Nombre del producto"
        {...register("nombre", {
          required: "El nombre es obligatorio",
          minLength: 2,
          maxLength: 50,
        })}
      />
      {errors.nombre && <p className="error-text">{errors.nombre.message}</p>}


      <input
        type="text"
        placeholder="Descripción"
        {...register("descripcion", {
          required: "La descripción es obligatoria",
          minLength: 5,
          maxLength: 200,
        })}
      />
      {errors.descripcion && <p className="error-text">{errors.descripcion.message}</p>}


      <input
        type="number"
        placeholder="Precio"
        {...register("precio", {
          required: "El precio es obligatorio",
          min: 1,
          max: 10000,
        })}
      />
      {errors.precio && <p className="error-text">{errors.precio.message}</p>}

      <input
  type="text"
  placeholder="URL de imagen"
  {...register("imagen", {
    required: "La imagen es obligatoria"
  })}
/>
{errors.imagen && <p className="error-text">{errors.imagen.message}</p>}


      <input
      type="date"
      placeholder="Fecha de creación"
      {...register("fecha", {
        required: "La fecha es obligatoria"
      })}
/>

      <select {...register("categoria", {required: "Selecciona una categoria"})}>
        <option value="">Selecciona una categoría</option>
        <option value="anillos">Anillos</option>
        <option value="aretes">Aretes</option>
        <option value="pulseras">Pulseras</option>
        <option value="brazaletes">Brazaletes</option>
        <option value="cadenas">Cadenas</option>
        <option value="collares">Collares</option>
        <option value="dijes">Dijes</option>
      </select>

      <input type="submit" value={edicion ? "Actualizar" : "Crear producto"} />
</form>
  );
}