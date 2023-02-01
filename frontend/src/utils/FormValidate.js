const validate = (values) => {
    let errorsCounter = 0;
    const errors = {};
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (values.hasOwnProperty('name') && values.name.length < 2) {
        errors.name = "Ingrese su nombre.";
        errorsCounter += 1
    }
    if (values.hasOwnProperty('lastname') && values.lastname.length < 2) {
        errors.lastname = "Ingrese su apellido.";
        errorsCounter += 1
    }
    if (!regex.test(values.email)) {
        errors.email = "Debe ingresar un correo válido.";
        errorsCounter += 1
    }
    if (values.password.length < 4) {
        errors.password = "La contraseña debe tener más de 4 caracteres.";
        errorsCounter += 1
    }
    if (values.hasOwnProperty('confirmPassword')) {
        console.log("inside")
        if (values.confirmPassword.length < 4) {
            errors.confirmPassword = "La contraseña debe tener más de 4 caracteres.";
            errorsCounter += 1
        }
        else if(values.confirmPassword.toUpperCase() !== values.password.toUpperCase()){
            errors.confirmPassword = "Las contraseñas no coinciden.";
            errorsCounter += 1
        }

    }
    return { errors, errorsCounter };
};

export default validate;