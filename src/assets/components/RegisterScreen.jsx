function RegisterScreen() {
    return (
        <div className="register-container">
      
           <h1>Registrarse</h1>
            <form className="register-form">
            <div className="form-group">
                <label htmlFor="email">Email:*</label>
                <input type="email" placeholder="Dirección de correo electrónico*" />
            </div>

            <div className="form-group">
                <label htmlFor="contraseña">Contraseña:*</label>
                <input type="password" placeholder="Contraseña*"  />
                </div>

                <div className="form-group">
                <label htmlFor="confirmarContraseña">Confirmar contraseña:*</label>
                <input type="password" placeholder="Confirmar contraseña*" />
                </div>
                <button type="submit" className="submit-btn">Si! Me quiero registrar en ByteWise</button>
            </form>
            <br />
            <p>¿Tienes una cuenta? <a href="/login">¡Inicia sesión aquí!</a></p>
                <p className="social-p">o conectate a través de:</p>
            <div className="social-login">
                <button className="facebook-btn">Facebook</button>
                <button className="google-btn">Google</button>
                <button className="apple-btn">Apple</button>
            </div>

        </div>
    );
}

  export default RegisterScreen