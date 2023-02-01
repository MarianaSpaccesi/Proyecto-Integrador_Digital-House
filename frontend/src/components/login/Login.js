import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import validate from '../../utils/FormValidate';
import UserEndpoints from '../../endpoints/user';

const Login = ({ handleLogin }) => {
    const navigate = useNavigate();
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { errorsCounter, errors } = validate(formValues)
        setFormErrors(errors);
        if (errorsCounter === 0) {
            const { email, password } = formValues;
            const payload = {
                username: email,
                password: password
            }
           try{
            login(payload)
            setIsSubmit(true);
            handleLogin(true);
           } catch (error) {
            console.log(error)
            setShowAlert(true);
           }
        }
    };
    const login = async (user) => {
        const response = await UserEndpoints.login(user)
        if(response.access_token){
            sessionStorage.setItem('token', response.access_token)
            const user = await UserEndpoints.getUser(response.access_token);
            sessionStorage.setItem('user', JSON.stringify(user))
            console.log(user);
        }

        
       
        
    }
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="login" data-testid="div-login">
            <div className="container py-5 flex-grow-1">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <h2 className="pb-0 pt-5 text-center fw-bold text-primary" data-testid="title-section">Iniciar Sesion</h2>
                        <div className={`alert alert-primary py-2 mt-3 ${!showAlert && 'opacity-0'}`} role="alert">
                            Por favor vuelva a intentarlo, sus credenciales son inválidas
                        </div>
                        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                            {/* Email input */}
                            <div className="col-lg-12 col-sm-12 form-outline mb-4">
                                <label htmlFor="emailLogin" className="form-label text-secondary">Correo electrónico</label>
                                <input type="email" name="email" id="emailLogin" data-testid="email-input" className={`form-control ${formErrors.email && 'error-message'}`} value={formValues.email} onChange={handleChange} required />
                                <p className="error-message pt-2 text-end">{formErrors.email}</p>
                            </div>
                            {/* Password input */}
                            <div className="col-lg-12 col-sm-12 form-outline mb-4">
                                <label htmlFor="passwordLogin" className="form-label text-secondary">Contraseña</label>
                                <div className="position-relative">
                                    <input type={passwordShown ? "text" : "password"} name="password" id="passwordLogin" data-testid="pass-input" className={`form-control password ${formErrors.password && 'error-message'}`} value={formValues.password} onChange={handleChange} required />
                                    <i className={` togglePassword ${passwordShown ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}`} onClick={togglePassword} data-testid="toggle-pass" />
                                </div>
                                <p className="error-message pt-2 text-end">{formErrors.password}</p>
                            </div>
                            {/* Submit button */}
                            <div className="col-lg-12 col-sm-12">
                                <div className="d-grid gap-2 col-lg-6 col-md-12 mx-auto">
                                    <button type="submit" data-testid="login-button" className="btn btn-primary mb-5 px-5 fw-bold">Ingresar</button>
                                </div>
                            </div>
                        </form>
                        <div className="text-center">
                            {Object.keys(formErrors).length === 0 && isSubmit ? navigate('/') : ''}
                        </div>
                        {/* Register button */}
                        <div className="text-center" data-testid="link-register">
                            <p>¿Aún no tenes cuenta? <Link to="/register">Registrate</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;