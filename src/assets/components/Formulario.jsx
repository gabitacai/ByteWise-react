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

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    
    validateField(name, value);
  };

  // Función para validar cada campo
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

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación general antes de enviar el formulario
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });

    // Si no hay errores, puedes enviar el formulario o hacer alguna acción.
    if (!Object.values(errors).some((error) => error !== '')) {
      console.log('Formulario enviado', formData);
      // Aquí iría el código para enviar los datos, como una API o algún manejo.
    }
  };

  return (
    <div className="form-container">
      <h2>Formulario de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            
          />
          {errors.nombre && <p className="error-message">{errors.nombre}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            
          />
          {errors.mensaje && <p className="error-message">{errors.mensaje}</p>}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;