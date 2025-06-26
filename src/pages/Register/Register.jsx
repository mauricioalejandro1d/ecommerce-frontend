import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import './Register.css';

export default function Register() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (datos) => {
    Swal.fire({
      title: '¡Registro Exitoso!',
      text: `Bienvenido/a, ${datos.nombre}`,
      icon: 'success',
      confirmButtonColor: '#9f7a49',
    });
    reset();
  };

  return (
    <section className="register-container">
      <h1>CREAR CUENTA</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nombre" {...register("nombre", { required: true })} />
        <input type="email" placeholder="Correo" {...register("email", { required: true })} />
        <input type="password" placeholder="Contraseña" {...register("password", { required: true })} />
        <input type="submit" value="Registrarse" className="btn-enviar" />
      </form>
    </section>
  );
}