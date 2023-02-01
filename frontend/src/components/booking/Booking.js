import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import './booking.css';
import { DateRange } from 'react-date-range';
import { addDays, eachHourOfInterval } from 'date-fns';
import format from 'date-fns/format';

import productEndpoints from '../../endpoints/product';
import BookingEndpoints from '../../endpoints/booking';

const Booking = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        const getProduct = async () => {
            const response = await productEndpoints.getProductById(id)
            setProduct(response)
        }
        getProduct()
    }, []);

    const getWindowSize = () => {
        const { innerWidth } = window;
        return innerWidth;
    }

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const hours = eachHourOfInterval({ start: today, end: tomorrow }, 0);

    const navigate = useNavigate();
    const initialValues = { city: "", pickingHour: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    };
    const createBooking = async (payload) => {
        const response = await BookingEndpoints.createBooking(payload)
        console.log(response);
    }
    const handleSubmit = (e) => {
        const payload = {
            startTime: formValues.pickingHour,
            bookingStartDate: format(date[0].startDate, "yyyy-MM-dd"),
            bookingEndDate: format(date[0].endDate, "yyyy-MM-dd"),
            product: {
                id: id
            }
        }
        e.preventDefault();
        setFormErrors(validate(formValues));
        console.log(formValues);
        createBooking(payload);
        if (Object.keys(formErrors).length === 0) { setIsSubmit(true); }
    };

    const validate = (values) => {
        const errors = {};
        if (!values.city) {
            errors.city = "Este campo es requerido."
        }
        if (!values.pickingHour) {
            errors.pickingHour = "Este campo es requerido."
        }
        return errors;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if (!product) {
        return (
            <div className="height-70vh w-100 d-flex align-items-center justify-content-center">
      
      <div className="spinner-grow text-primary" id="loader" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
  
        )

    } else {
        return (
            <div className="booking">
                {/* header */}
                <div className="detail-header text-bg-secondary">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="row py-2">
                                <div className="col col-12">
                                    <h5 className="text-start primary-color fw-light fs-6 text-uppercase">{product.category.title}</h5>
                                </div>
                                <div className="col col-12">
                                    <h1 className="text-start fs-2">{product.title}</h1>
                                </div>
                            </div>
                            <div className="row py-2">
                                <div className="col col-12">
                                    <Link to={`/product/${product.id}`} className="arrow-back"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" /></svg></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* main content */}
                <div className="content-booking">
                    <div className="container">
                        {/* form */}
                        <form className="needs-validation" onSubmit={handleSubmit}>
                            <div className="row justify-content-start pb-6">
                                {/* column 1 */}
                                <div className="col-lg-8 col-md-12">
                                    {/* user data */}
                                    <h2 className="fs-3 pt-4 pb-3 m-0">Completá tus datos</h2>
                                    <div className="row form-row1 pt-5 px-5">
                                        <div className="col-lg-6 col-md-6 col-sm-12 pb-4">
                                            <label htmlFor="Name" className="form-label fs-6">Nombre</label>
                                            <input type="text" className="form-control" placeholder="Jane" id="booking" aria-label="name" disabled />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 pb-4">
                                            <label htmlFor="Lastname" className="form-label fs-6">Apellido</label>
                                            <input type="text" className="form-control" placeholder="Doe" id="booking" aria-label="Lastname" disabled />
                                        </div>
                                    </div>
                                    <div className="row form-row2 pb-5 px-5">
                                        <div className="col-lg-6 col-md-6 col-sm-12 pb-4">
                                            <label htmlFor="Email" className="form-label fs-6">Email</label>
                                            <input type="Email" className="form-control" placeholder="user@mail.com" id="booking" aria-label="email" disabled />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 pb-4">
                                            <label htmlFor="city" className="form-label fs-6">Ciudad</label>
                                            <input type="text" name="city" className={`form-control ${formErrors.city && 'error-message'}`}
                                                id="city" value={formValues.city} onChange={handleChange} />
                                            <p className="error-message text-end">{formErrors.city}</p>
                                        </div>
                                    </div>
                                    <h2 className="fs-3 pt-5 pb-3 m-0">Seleccioná tu fecha de reserva</h2>
                                    {/* calendar */}
                                    <div className="container ps-0">
                                        <div className="row ms-auto">
                                            {windowSize > 771 ?
                                                <div className="col-xl-8 col-lg-9 col-md-6 pe-4 ps-0 text-secondary desktop-bookingCalendar">
                                                    <div className="col-lg-4 col-sm-12 pb-3">
                                                        {<DateRange
                                                            className="calendar-booking"
                                                            editableDateInputs={true}
                                                            onChange={item => setDate([item.selection])}
                                                            moveRangeOnFirstSelection={false}
                                                            ranges={date}
                                                            minDate={addDays(new Date(), -0)}
                                                            rangeColors={["rgb(242, 112, 77)"]}
                                                            months={2}
                                                            direction="horizontal"
                                                        />}
                                                    </div>
                                                </div>
                                                :
                                                <div className="col-lg-8 col-md-6 py-3 pe-4 text-secondary mobile-bookingCalendar">
                                                    <div className="col-lg-4 col-sm-12 pb-3">
                                                        {<DateRange
                                                            className="calendar-booking"
                                                            editableDateInputs={true}
                                                            onChange={item => setDate([item.selection])}
                                                            moveRangeOnFirstSelection={false}
                                                            ranges={date}
                                                            minDate={addDays(new Date(), -0)}
                                                            rangeColors={["rgb(242, 112, 77)"]}
                                                            months={1}
                                                            direction="horizontal"
                                                        />}
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>
                                    {/* picking time */}
                                    <h2 className="fs-3 pt-4 pb-3 m-0">Tu horario de retiro</h2>
                                    <div className="select-booking py-5 px-5">
                                        <h4 className="fs-5 pb-2"><i className="bi bi-check-circle"></i> Tu auto va a estar listo para el check in entre las 10:00AM y las 11:00PM</h4>
                                        <label htmlFor="time" className="form-label fs-6">Indicá tu horario estimado de llegada</label>
                                        <select name="pickingHour" className={`form-select ${formErrors.pickingHour && 'error-message is-invalid'}`}
                                            aria-label="Seleccionar hora de llegada" value={formValues.pickingHour} onChange={handleChange}>
                                            <option className="pickingHour" defaultValue={false}></option>
                                            {hours.slice(1, 26).map((hour, i) => {
                                                return <option value={hour[i]} key={i}>{format(hour, 'HH:mm:ss')}</option>
                                            })}
                                        </select>
                                        <p className="error-message text-end">{formErrors.pickingHour}</p>
                                    </div>
                                </div>
                                {/* column 2 */}
                                <div className="col2 col-lg-4 col-md-12">
                                    <div className="row g-0">
                                        <div className="card-booking mt-5 col-md-12">
                                            <h2 className="fs-3 pt-4 pb-3 ps-4">Detalle de la reserva</h2>
                                            <img src={product.images[0].urlImage} className="card-img-top" alt="..."></img>
                                            <div className="card-body px-4 pt-5 pb-4">
                                                <h6 className="card-subtitle mb-1 text-muted text-uppercase">{product.category.title}</h6>
                                                <h5 className="card-title fw-bold">{product.title}</h5>
                                                <p className="card-text py-3"><i className="bi bi-geo-alt-fill"></i> {product.city.city}, {product.city.country}</p>
                                                <div className="card border-secondary opacity-25 mb-4"></div>
                                                <div className="row justify-content-start px-3 pb-4">
                                                    <div className="col">
                                                        <h5 className="card-title fw-bold fs-6">Check in</h5>
                                                    </div>
                                                    <div className="col">
                                                        <h5 className="card-title fs-6 text-end">{`${format(date[0].startDate, "dd/MM/yyyy")}`}</h5>
                                                    </div>
                                                </div>
                                                <div className="card border-secondary opacity-25 mb-4"></div>
                                                <div className="row justify-content-start px-3 pb-4">
                                                    <div className="col">
                                                        <h5 className="card-title fw-bold fs-6">Check out</h5>
                                                    </div>
                                                    <div className="col">
                                                        <h5 className="card-title fs-6 text-end">{`${format(date[0].endDate, "dd/MM/yyyy")}`}</h5>
                                                    </div>
                                                </div>
                                                <div className="card border-secondary opacity-25 mb-4"></div>
                                                <div className="d-grid gap-2 col-lg-12 col-md-12 mx-auto pt-4">
                                                    <button type="submit" className="btn btn-primary px-5 fw-bold w-100">Confirmar reserva</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="text-center">
                            {Object.keys(formErrors).length === 0 && isSubmit ? navigate('/successBooking') : ''}
                        </div>
                    </div>
                </div>
                {/* politics */}
                <div className="politics-border">
                    <div className="container">
                        <h2 className="fs-3 pt-4 pb-3 m-0">Que tenes que saber</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="container pt-3 pb-5">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 py-3 pe-4 text-secondary">
                                <p className="fs-5">Normas del auto</p>
                                <span className="text-secondary" id="politics-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</span>
                            </div>
                            <div className="col-lg-3 col-md-6 py-3 pe-4 text-secondary">
                                <p className="fs-5">Seguridad e higiene</p>
                                <span className="text-secondary" id="politics-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</span>
                            </div>
                            <div className="col-lg-3 col-md-6 py-3 pe-4 text-secondary">
                                <p className="fs-5">Politica de cancelacion</p>
                                <span className="text-secondary" id="politics-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Booking;