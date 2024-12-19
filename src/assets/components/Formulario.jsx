import React, { useState } from 'react';

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar el modal

  // Función para manejar los cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validar el campo cada vez que cambia
    validateField(name, value);
  };

  // Función para validar los campos
  const validateField = (name, value) => {
    let errorMessage = '';

    if (value.trim() === '') {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} es obligatorio.`;
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      errorMessage = 'Por favor, ingresa un email válido.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación general antes de enviar el formulario
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });

    // Si no hay errores, mostramos el modal de éxito
    if (!Object.values(errors).some((error) => error !== '')) {
      console.log('Formulario enviado', formData);
      setModalVisible(true); // Mostrar el modal
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="form-container">
      <h1>Formulario de Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:*</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder='Nombre*'
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <p className="error-message">{errors.nombre}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:*</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Email*'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje:*</label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder='Mensaje'
            value={formData.mensaje}
            onChange={handleChange}
          />
          {errors.mensaje && <p className="error-message">{errors.mensaje}</p>}
        </div>

        <button className="form-btn" type="submit">
          Enviar
        </button>
      </form>

      {/* Modal de éxito */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¡Formulario enviado con éxito!</h2>
            <p>Nos pondremos en contacto a la brevedad.</p>
            <button className="close-modal-btn" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formulario;
