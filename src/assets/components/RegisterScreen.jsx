import React, { useState } from 'react';

function RegisterScreen() {
  const [formData, setFormData] = useState({
    email: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const [modalVisible, setModalVisible] = useState(false); 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    
    validateField(name, value);
  };

 
  const validateField = (name, value) => {
    let errorMessage = '';

    if (value.trim() === '') {
      if (name === 'confirmarContraseña') {
        errorMessage = 'Confirme su contraseña.';  
      } else {
        errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} es obligatorio.`;
      }
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      errorMessage = 'Por favor, ingresa un email válido.';
    } else if (name === 'contraseña' && !/^.{8,}$/.test(value)) {
      errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (name === 'contraseña' && !/(?=.*[A-Z])/.test(value)) {
      errorMessage = 'La contraseña debe tener al menos una letra mayúscula.';
    } else if (name === 'contraseña' && !/(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\`~])/.test(value)) {
      errorMessage = 'La contraseña debe contener al menos un carácter especial.';
    } else if (name === 'confirmarContraseña' && value !== formData.contraseña) {
      errorMessage = 'Las contraseñas no coinciden.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });

    
    if (!Object.values(errors).some((error) => error !== '')) {
      console.log('Formulario enviado', formData);
      setModalVisible(true); 
    }
  };

  
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="register-container">
      <h1>Registrarse</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:*</label>
          <input
            type="email"
            name="email"
            placeholder="Dirección de correo electrónico*"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:*</label>
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña*"
            value={formData.contraseña}
            onChange={handleChange}
          />
          {errors.contraseña && <p className="error-message">{errors.contraseña}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmarContraseña">Confirmar contraseña:*</label>
          <input
            type="password"
            name="confirmarContraseña"
            placeholder="Confirmar contraseña*"
            value={formData.confirmarContraseña}
            onChange={handleChange}
          />
          {errors.confirmarContraseña && (
            <p className="error-message">{errors.confirmarContraseña}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          ¡Si! Me quiero registrar en ByteWise
        </button>
      </form>
      <br />
      <p>
        ¿Tienes una cuenta? <a href="/login">¡Inicia sesión aquí!</a>
      </p>
      <p className="social-p">o conéctate a través de:</p>
      <div className="social-login">
        <button className="facebook-btn">Facebook</button>
        <button className="google-btn">Google</button>
        <button className="apple-btn">Apple</button>
      </div>

     
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¡Registro exitoso!</h2>
            <p>Revise su correo electrónico para confirmar su cuenta.</p>
            <button className="close-modal-btn" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterScreen;
