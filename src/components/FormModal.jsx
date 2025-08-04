import { useState, useEffect } from "react";
import styles from "../styles/FormModal.module.css";

const FormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    ocupacion: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || "",
        apellido: initialData.apellido || "",
        fechaNacimiento: initialData.fechaNacimiento || "",
        ocupacion: initialData.ocupacion || "",
      });
    } else {
      setForm({
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        ocupacion: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calcularEdad = (fecha) => {
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const edad = calcularEdad(form.fechaNacimiento);
    const nuevoDato = {
      ...form,
      id: initialData?.id || crypto.randomUUID(),
      edad,
    };
    onSubmit(nuevoDato);
    onClose();
    setForm({
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      ocupacion: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{initialData ? "Editar usuario" : "Registrar nuevo usuario"}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            minLength={2}
          />

          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
            minLength={2}
          />

          <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            required
          />

          <label htmlFor="ocupacion">Ocupación</label>
          <input
            type="text"
            id="ocupacion"
            name="ocupacion"
            value={form.ocupacion}
            onChange={handleChange}
          />

          <div className={styles.buttons}>
            <button type="submit">{initialData ? "Actualizar" : "Registrar"}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;