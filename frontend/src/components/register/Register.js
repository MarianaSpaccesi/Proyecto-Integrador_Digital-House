import React, { useState } from 'react'
import './register.css';
import { Link, useNavigate } from "react-router-dom";
import validate from '../../utils/FormValidate';
import userRegisterModel from '../../utils/userRegisterModel';
import UserEndpoints from '../../endpoints/user';

const Register = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(userRegisterModel);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const user1 = {
        name: "user test",
        lastname : "user test" ,
        username: "mari@mail.com",
        password: "usertest",
        city:{
            id : 1
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { errorsCounter, errors } = validate(formValues)
        setFormErrors(errors);
        if (errorsCounter === 0) {
            console.log(formValues)
            userRegister(user1)

        }
        // setIsSubmit(true);
    }
    const userRegister = async (user) => {
        const response = await UserEndpoints.createUser(user)
        console.log(response);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className="register">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <h2 className="py-5 text-center fw-bold text-primary">Crear Cuenta</h2>
                        <form className="needs-validation" onSubmit={handleSubmit}>
                            {/* name input */}
                            <div className="row">
                                <div className="col-lg-6 col-sm-6 form-outline mb-3">
                                    <label className="form-label text-secondary" htmlFor="nameRegister">Nombre</label>
                                    <input type="text" name="name" id="nameRegister" data-testid="name-input"
                                        className={`form-control ${formErrors.name && 'error-message'}`}
                                        value={formValues.name} onChange={handleChange} />

                                    <p className={`error-message text-end ${!formErrors.name && 'opacity-0'}`}>- {formErrors.name}</p>
                                </div>
                                {/* lastname input */}
                                <div className="col-lg-6 col-sm-6 form-outline mb-3">
                                    <label className="form-label text-secondary" htmlFor="lastnameRegister">Apellido</label>
                                    <input type="text" name="lastname" id="lastnameRegister" data-testid="lastname-input"
                                        className={`form-control ${formErrors.lastname && 'error-message'}`}
                                        value={formValues.lastname} onChange={handleChange} />

                                    <p className={`error-message text-end ${!formErrors.lastname && 'opacity-0'}`}>- {formErrors.lastname}</p>
                                </div>
                            </div>
                            {/* email input */}
                            <div className="col-lg-12 col-sm-12 form-outline mb-4">
                                <label className="form-label text-secondary" htmlFor="emailRegister">Correo electrónico</label>
                                <input type="email" name="email" id="emailRegister" data-testid="email-input"
                                    className={`form-control ${formErrors.email && 'error-message'}`}
                                    value={formValues.email} onChange={handleChange} />
                                <p className={`error-message text-end ${!formErrors.email && 'opacity-0'}`}>- {formErrors.email}</p>
                            </div>
                            {/* password input */}
                            <div className="col-lg-12 col-sm-12 form-outline mb-4">
                                <label htmlFor="passwordRegister" className="form-label text-secondary">Contraseña</label>
                                <div className="position-relative">
                                    <input type={passwordShown ? "text" : "password"} name="password" id="passwordRegister" data-testid="pass-input"
                                        className={`form-control password ${formErrors.password && 'error-message'}`}
                                        value={formValues.password} onChange={handleChange} />
                                    <i className={` togglePassword ${passwordShown ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}`}
                                        onClick={() => setPasswordShown(!passwordShown)} />
                                </div>
                                <p className={`error-message text-end ${!formErrors.password && 'opacity-0'}`}>- {formErrors.password}</p>
                            </div>
                            {/* confirmPassword input */}
                            <div className="col-lg-12 col-sm-12 form-outline mb-4">
                                <label htmlFor="confirmPassword" className="form-label text-secondary">Contraseña</label>
                                <div className="position-relative">
                                    <input type={confirmPasswordShown ? "text" : "password"} name="confirmPassword" id="confirmPassword" data-testid="pass-input-confirm"
                                        className={`form-control password ${formErrors.confirmPassword && 'error-message'}`}
                                        value={formValues.confirmPassword} onChange={handleChange} />
                                    <i className={` togglePassword ${confirmPasswordShown ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}`}
                                        onClick={() => setConfirmPasswordShown(!confirmPasswordShown)} />
                                </div>
                                <p className={`error-message text-end ${!formErrors.confirmPassword && 'opacity-0'}`}>- {formErrors.confirmPassword}</p>
                            </div>
                            {/* Submit button */}
                            <div className="col-lg-12 col-sm-12">
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button type="submit" data-testid="register-button" className="btn btn-primary mb-5 mt-3 px-5 fw-bold">Crear cuenta</button>
                                </div>
                            </div>
                        </form>
                        <div className="text-center">
                            {Object.keys(formErrors).length === 0 && isSubmit ? navigate('/') : ''}
                        </div>
                        <div className="text-center">
                            <p>¿Ya tienes una cuenta? <Link to="/login">Inciar sesión</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register