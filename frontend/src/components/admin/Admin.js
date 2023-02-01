import React, { useState, useEffect } from 'react';
import './admin.css';
import { Link, useNavigate } from "react-router-dom";
import categoryEndpoints from '../../endpoints/category';
import cityEndpoints from '../../endpoints/city';
import featureEndpoints from '../../endpoints/feature';
import createProductModel from '../../utils/createProductModel';


const Admin = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [features, setFeatures] = useState([]);
    const [imagesList, setImagesList] = useState([{ image: "" }]);
    const [formValues, setFormValues] = useState(createProductModel);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    

    useEffect(() => {
        const getCategories = async() => {
            const response = await categoryEndpoints.getCategories();
            setCategories(response);
        }
        getCategories(categories);
    }, []);

    useEffect(() => {
        const getCities = async() => {
            const response = await cityEndpoints.getCities();
            setCities(response);
        }
        getCities(cities);
    }, []);

    useEffect(() => {
        const getFeatures = async() => {
            const response = await featureEndpoints.getFeatures();
            setFeatures(response);
        }
        getFeatures(features);
    }, []);
    
    const doors = features.filter(feature => feature.type === "doors");
    const airConditioner = features.filter(feature => feature.type === "airConditioner");
    const numPassengers = features.filter(feature => feature.type === "numPassengers");
    const transmission = features.filter(feature => feature.type === "transmission");
    const gps = features.filter(feature => feature.type === "gps");
    const autonomy = features.filter(feature => feature.type === "autonomy");
    const model = features.filter(feature => feature.type === "model");
    const motorType = features.filter(feature => feature.type === "motorType");


    const handleImageChange = (e,index) => {
        const { name, value } = e.target;
        const image = [...imagesList];
        image[index][name] = value; 
        setImagesList(image);
        setFormValues({...formValues, image});
    };


    const handleImageRemove = (index) => {
        const list = [...imagesList];
        list.splice(index, 1);
        setImagesList(list);
    };

    const handleImageAdd = () => {
        setImagesList([...imagesList, { image: "" }]);
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0) {setIsSubmit(true);   }
    };

    // useEffect(() => {
    //     console.log(formErrors)
    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    //         console.log(formValues);
    //     }
    // }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        if(!values.image){
            errors.image = "Ingresa minimo una url de imagen de producto."
        }
        if(!values.carCategory){
            errors.carCategory = "Selecciona una cateogoría."
        }
        if(!values.carCity){
            errors.carCity = "Selecciona una ciudad."
        }
        if (!values.carName){
            errors.carName = "Ingresa el nombre del producto."
        }
        if (!values.carAdress){
            errors.carAdress = "Ingresa la direccion donde se encuentra el producto."
        }
        if (!values.carDescription){
            errors.carDescription = "Ingresa una descripcion del producto."
        }
        if (!values.carRules){
            errors.carRules = "Ingresa las normas y reglas."
        }
        if (!values.carPolitics){
            errors.carPolitics = "Ingresa las medidas de seguridad."
        }
        if (!values.carSecurity){
            errors.carSecurity = "Ingresa las politicas y condiciones."
        }
        if (!values.motorType){
            errors.motorType = "Selecciona un valor."
        }
        if (!values.numPassengers){
            errors.numPassengers = "Selecciona un valor."
        }
        if (!values.transmission){
            errors.transmission = "Selecciona un valor."
        }
        if (!values.model){
            errors.model = "Selecciona un valor."
        }
        if (!values.gps){
            errors.gps = "Selecciona un valor."
        }
        if (!values.doors){
            errors.doors = "Selecciona un valor."
        }
        if (!values.airConditioner){
            errors.airConditioner = "Selecciona un valor."
        }
        if (!values.autonomy){
            errors.autonomy = "Selecciona un valor."
        }
        return errors;
    };

    return (
        <div className="admin">
             {/* header */}
            <div className="detail-header text-bg-secondary">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="row py-2">
                            <div className="col col-12">
                                <h1 className="text-start fs-2">Administracion</h1>
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col col-12">
                                <Link to="/" className="arrow-back"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" /></svg></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* form */}
            <div className="container container-form-admin">
            <form className="form-booking py-5 px-5 needs-validation" onSubmit={handleSubmit}>
                            {/* Name of product */}
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 pb-4">
                                    <label htmlFor="carName" className="form-label fs-6">Nombre de la propiedad</label>
                                    <input type="text" name="carName" id="carName"
                                    className={`form-control ${formErrors.carName && 'error-message'}`}
                                    value={formValues.carName} onChange={handleChange}/>
                                    <p className="error-message text-end">{formErrors.carName}</p>
                                </div>
                            {/* Category */}
                                <div className="col-lg-6 col-md-6 col-sm-12 pb-4">
                                    <label htmlFor="carCategory" className="form-label fs-6">Categoria</label>
                                    <select name="carCategory" 
                                    className={`form-select ${formErrors.carCategory && 'error-message is-invalid'}`} 
                                    id="carCategory" value={formValues.carCategory} onChange={handleChange}>
                                    <option className="carCategory" defaultValue={true}></option>
                                    {categories.map(category =>  
                                    <option value={category.title} key={category.id}>{category.title}</option> )}
                                    </select>
                                    <p className="error-message text-end">{formErrors.carCategory}</p>
                                </div>
                            </div>
                            {/* Address */}
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 pb-4">
                                    <label htmlFor="carAdress" className="form-label fs-6">Direccion</label>
                                    <input type="text" name="carAdress" className={`form-control ${formErrors.carAdress && 'error-message'}`} 
                                    id="carAdress" aria-label="carAdress" value={formValues.carAdress} onChange={handleChange} />
                                    <p className="error-message text-end">{formErrors.carAdress}</p>
                                </div>
                            {/* City */}
                                <div className="col-lg-6 col-md-6 col-sm-12 pb-4">
                                    <label htmlFor="carCity" className="form-label fs-6">Ciudad</label>
                                    <select name="carCity" className={`form-select ${formErrors.carCity && 'error-message is-invalid'}`} 
                                    id="carCity" value={formValues.carCity} onChange={handleChange}>
                                    <option className="carCity" defaultValue={true}></option>
                                    {cities.map(city =>  
                                    <option value={city.city} key={city.id}>{city.city}, {city.country}</option> )}
                                    </select>
                                    <p className="error-message text-end">{formErrors.carCity}</p>
                                </div>
                            </div>
                            {/* Description */}
                            <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 pb-4">
                                    <label htmlFor="carDescription" className="form-label fs-6">Descripcion</label>
                                    <textarea type="text" name="carDescription" className={`form-control ${formErrors.carDescription && 'error-message is-invalid'}`} 
                                    id="carDescription" aria-label="carDescription" value={formValues.carDescription} onChange={handleChange} />
                                    <p className="error-message text-end">{formErrors.carDescription}</p>
                                </div>
                            </div>
                            {/* Features */}
                            <div className="row">
                            <h4 className="text-primary">Agregar atributos</h4>
                                {/* motorType */}
                                <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                    <label htmlFor="carFeatures" className="form-label fs-6">Atributos</label>
                                    <select className="form-control" id="selectCarFeatures" disabled>
                                    <option className="selectFeatures" defaultValue="selected">Tipo de motor</option>
                                    </select>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                    <label htmlFor="motorType" className="form-label fs-6">Valores</label>
                                    <select name="motorType" className={`form-select ${formErrors.motorType && 'error-message is-invalid'}`} 
                                    id="motorType" value={formValues.motorType} onChange={handleChange} >
                                    <option className="motorType" defaultValue={true}></option>
                                    {motorType.map(motorType =>  
                                    <option value={motorType.value} key={motorType.id}>{motorType.value}</option> )}
                                    </select>
                                    <p className="error-message text-end">{formErrors.motorType}</p>
                                </div>
                            </div>
                                {/* num Passengers */}
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                    <label htmlFor="carFeatures" className="form-label fs-6"></label>
                                        <select className="form-control" id="selectCarFeatures" disabled>
                                        <option className="selectFeatures" defaultValue="selected">Cantidad de pasajeros</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="numPassengers" className="form-label fs-6"></label>
                                        <select name="numPassengers" className={`form-select ${formErrors.numPassengers && 'error-message is-invalid'}`} 
                                        id="numPassengers" value={formValues.numPassengers} onChange={handleChange} >
                                        <option className="numPassengers" defaultValue={true}></option>
                                        {numPassengers.map(passenger =>  
                                        <option value={passenger.value} key={passenger.id}>{passenger.value}</option> )}
                                        </select>
                                        <p className="error-message text-end">{formErrors.numPassengers}</p>
                                    </div>
                                </div>
                                {/* Transmission */}
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="carFeatures" className="form-label fs-6"></label>
                                        <select className="form-control" id="selectCarFeatures" disabled>
                                        <option className="selectFeatures" defaultValue="selected">Transmision</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="transmission" className="form-label fs-6"></label>
                                        <select name="transmission" className={`form-select ${formErrors.transmission && 'error-message is-invalid'}`} 
                                        id="transmission" value={formValues.transmission} onChange={handleChange} >
                                        <option className="transmission" defaultValue={true}></option>
                                        {transmission.map(transmission =>  
                                        <option value={transmission.value} key={transmission.id}>{transmission.value}</option> )}
                                        </select>
                                        <p className="error-message text-end">{formErrors.transmission}</p>
                                    </div>
                                </div>
                                {/* Model */}
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="carFeatures" className="form-label fs-6"></label>
                                        <select className="form-control" id="selectCarFeatures" disabled>
                                        <option className="selectFeatures" defaultValue="selected">Modelo de auto</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="model" className="form-label fs-6"></label>
                                        <select name="model" className={`form-select ${formErrors.transmission && 'error-message is-invalid'}`} 
                                        id="model" value={formValues.model} onChange={handleChange} >
                                        <option className="model" defaultValue={true}></option>
                                        {model.map(model =>  
                                        <option value={model.value} key={model.id}>{model.value}</option> )}
                                        </select>
                                        <p className="error-message text-end">{formErrors.model}</p>
                                    </div>
                                </div>
                                {/* Gps */}
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="carFeatures" className="form-label fs-6"></label>
                                        <select className="form-control" id="selectCarFeatures" disabled>
                                        <option className="selectFeatures" defaultValue="selected">GPS</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="gps" className="form-label fs-6"></label>
                                        <select name="gps" className={`form-select ${formErrors.gps && 'error-message is-invalid'}`} 
                                        id="gps" value={formValues.gps} onChange={handleChange} >
                                        <option className="gps" defaultValue={true}></option>
                                        {gps.map(gps =>  
                                        <option value={gps.value} key={gps.id}>{gps.value}</option> )}
                                        </select>
                                        <p className="error-message text-end">{formErrors.gps}</p>
                                    </div>
                                </div>
                                {/* Doors  */}
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="carFeatures" className="form-label fs-6"></label>
                                        <select className="form-control" id="selectCarFeatures" disabled>
                                        <option className="selectFeatures" defaultValue="selected">Puertas</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="doors" className="form-label fs-6"></label>
                                        <select name="doors" className={`form-select ${formErrors.doors && 'error-message is-invalid'}`} 
                                        id="doors" value={formValues.doors} onChange={handleChange} >
                                        <option className="doors" defaultValue={true}></option>
                                        {doors.map(door =>  
                                        <option value={door.id} key={door.id}>{door.value}</option> )}
                                        </select>
                                        <p className="error-message text-end">{formErrors.doors}</p>
                                    </div>
                                </div>
                                {/* Air Conditioner */}
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="carFeatures" className="form-label fs-6"></label>
                                        <select className="form-control" id="selectCarFeatures" disabled>
                                        <option className="selectFeatures" defaultValue="selected">Aire acondicionado</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="airConditioner" className="form-label fs-6"></label>
                                        <select name="airConditioner" className={`form-select ${formErrors.airConditioner && 'error-message is-invalid'}`} 
                                        id="airConditioner" value={formValues.airConditioner} onChange={handleChange} >
                                        <option className="airConditioner" defaultValue={true}></option>
                                        {airConditioner.map(airConditioner =>  
                                        <option value={airConditioner.value} key={airConditioner.id} >{airConditioner.value}</option> )}
                                        </select>
                                        <p className="error-message text-end">{formErrors.airConditioner}</p>
                                    </div>
                                </div>
                                {/*  Autonomy */}
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="carFeatures" className="form-label fs-6"></label>
                                        <select className="form-control" id="selectCarFeatures" disabled>
                                        <option className="selectFeatures" defaultValue="selected">Autonomia</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 pb-1">
                                        <label htmlFor="autonomy" className="form-label fs-6"></label>
                                        <select name="autonomy" className={`form-select ${formErrors.autonomy && 'error-message is-invalid'}`} 
                                        id="autonomy" value={formValues.autonomy} onChange={handleChange} >
                                        <option className="autonomy" defaultValue={true}></option>
                                        {autonomy.map(autonomy =>  
                                        <option value={autonomy.value} key={autonomy.id}>{autonomy.value}</option> )}
                                        </select>
                                        <p className="error-message text-end">{formErrors.autonomy}</p>
                                    </div>
                                </div>
                            {/* Politics */}
                            <div className="row pt-4">
                                <h4 className="text-primary">Politicas del producto</h4>
                                <div className="col-lg-4 col-12 col-sm-12 pb-4">
                                    <label htmlFor="carRules" className="form-label fs-6">Normas del auto</label>
                                    <p className="description">Descripcion</p>
                                    <textarea name="carRules" className={`form-control ${formErrors.carRules && 'error-message is-invalid'}`} 
                                    id="carRules" aria-label="carRules" value={formValues.carRules} onChange={handleChange} />
                                    <p className="error-message text-end">{formErrors.carRules}</p>
                                </div>
                                <div className="col-lg-4 col-12 col-sm-12 pb-4">
                                    <label htmlFor="carSecurity" className="form-label fs-6">Seguridad e higiene</label>
                                    <p className="description">Descripcion</p>
                                    <textarea name="carSecurity" type="text" className={`form-control ${formErrors.carSecurity && 'error-message is-invalid'}`} 
                                    id="carSecurity" aria-label="carSecurity" value={formValues.carSecurity} onChange={handleChange}  />
                                    <p className="error-message text-end">{formErrors.carSecurity}</p>
                                </div>
                                <div className="col-lg-4 col-12 col-sm-12 pb-4">
                                    <label htmlFor="carPolitics" className="form-label fs-6">Politica de cancelacion</label>
                                    <p className="description">Descripcion</p>
                                    <textarea name="carPolitics" type="text" className={`form-control ${formErrors.carPolitics && 'error-message is-invalid'}`} 
                                    id="carPolitics" aria-label="carPolitics" value={formValues.carPolitics} onChange={handleChange} />
                                    <p className="error-message text-end">{formErrors.carPolitics}</p>
                                </div>
                            </div>
                            {/* Product Images  */}
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 pb-4">
                                <h4 className="text-primary">Cargar imagenes</h4>
                                    <label htmlFor="carImages" className="form-label fs-6">Imagen del producto</label>
                                    <p>Escribi la url de la imagen (maximo 6 imagenes)</p>
                                    {imagesList.map((singleImage, index) => (
                                        <div key={index} className="input-group mb-3">
                                        <input type="text" name="image" className={`form-control ${formErrors.image && 'error-message'}`} 
                                        value={singleImage.image} onChange={(e) => handleImageChange(e, index)} />
                                        {imagesList.length !== 1 && (
                                            <button className="btn" id="btnRemoveImg" onClick={() => handleImageRemove(index)}><i className="bi bi-x-square-fill"></i></button>
                                        )}
                                        
                                        {imagesList.length - 1 === index && imagesList.length < 6 && 
                                        (
                                        <button className="btn" id="btnAddImg" onClick={handleImageAdd}><i className="bi bi-plus-square-fill"></i></button>
                                        )}
                                    </div>
                                    ))}
                                    <p className="error-message text-end">{formErrors.image}</p>
                                </div>
                            </div>
                            {/* Submit button */}
                            <div className="col-lg-12 col-sm-12">
                                <div className="d-grid gap-2 col-lg-6 col-md-12 mx-auto">
                                    <button type="submit" className="btn btn-primary mb-5 px-5 fw-bold">Crear</button>
                                </div>
                            </div>
            </form>
            <div className="text-center">
                {Object.keys(formErrors).length === 0 && isSubmit ? navigate('/admin/success') : ''}
                
            </div>
            </div>
        </div>
    );
}

export default Admin;