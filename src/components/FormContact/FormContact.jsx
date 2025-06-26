import { useForm } from "react-hook-form"
import './FormContact.css'
import Swal from 'sweetalert2';

export default function FormContact({agregarContacto}) {

    const {register, handleSubmit, reset} = useForm();


    const onSubmit = (datosCliente) => {
        agregarContacto(datosCliente);
        reset();

        Swal.fire({
    title: 'Formulario enviado',
    text: 'Gracias por contactarnos',
    icon: 'success',
    confirmButtonColor: '#9f7a49',
    timer: 1500,
    showConfirmButton: false,
  });
    }

    

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input
  type="text"
  placeholder="Nombre"
  {...register("nombre", { 
    required: "El nombre es obligatorio",
    minLength: 2,
    maxLength: 15
    })}
/>

<input
  type="text"
  placeholder="Apellidos"
  {...register("apellido", { 
    required: "Los apellidos son obligatorios",
    minLength: 2,
    maxLength: 15 
    })}
/>
<input
  type="text"
  placeholder="Email"
  {...register("email", { 
    required: "El email es obligatorio", 
    minLength: 2,
    maxLength: 15,
    pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Correo inválido"
    } })}
/>
<input
  type="text"
  placeholder="Mensajes"
  {...register("mensaje", { 
    required: true,
    minLength: 4,
    maxLength: 200,
    })}
/>
<input type="submit" value="ENVIAR" className="btn-enviar"></input>
    </form>
  )
}
