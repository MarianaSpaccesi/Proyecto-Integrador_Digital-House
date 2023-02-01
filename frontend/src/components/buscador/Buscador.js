import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './buscador.css';
import cityEndpoints from '../../endpoints/city';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import ProductSearch from '../productSearch/ProductSearch';


const Buscador = () => {
    const refOutside = useRef(null)
    const [cities, setCities] = useState([]);
    const [cityid, setCityid] = useState('');
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);


    useEffect(() => {
        const getCities = async() => {
            const response = await cityEndpoints.getCities();
            setCities(response);
        }
        getCities();
    }, []);

    const handleCity = (event) => {
        const getcityid = event.target.value;
        setCityid(getcityid);
    }

    const [date, setDate] = useState([
        {
            startDate: addDays(new Date(), 7),
            endDate: addDays(new Date(), 14),
            key: 'selection'
        }
    ]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        document.addEventListener('keydown', hideCalendarOnEscape, true);
        document.addEventListener('click', hideCalendarClickOutside, true);
    }, []);

    const hideCalendarOnEscape = (e) => {
        if (e.key === "Escape") {
            setOpen(false)
        }
    }
    const hideCalendarClickOutside = (e) => {
        if (refOutside.current && !refOutside.current.contains(e.target)) {
            setOpen(false)
        }

    }
    const [dateIsSet, setDateIsSet] = useState(false)
    const handleClickIntput = (e) => {
        setOpen(open => !open)
        if (open || !dateIsSet) {
            setDateIsSet(true);
        }
    }

    console.log(cityid); 
    console.log(dateIsSet);

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert("Selecciona una ciudad y un rango de fechas."); 
        if ((dateIsSet) && (cityid)) { 
            setIsSubmit(true); 
            console.log('correcto');
            navigate('/results');

        } else {
            setIsSubmit(false);
            console.log('incorrecto');
            alert("Selecciona una ciudad y un rango de fechas."); 
        }
    }
    
    { <ProductSearch cityid={cityid} />}


    return (
        <section className="py-5 text-center" id="buscador">
            <div className="container d-flex flex-column">
                <h1 className="text-white fs-1">Busca ofertas para rentar tu próximo auto!</h1>
                <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className="container d-flex flex-column justify-content-center">
                <form>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-12 pb-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text bg-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" /></svg></div>
                                </div>
                                <select name="city" className="form-control" id="selectCity" data-testid="city-input" onChange={(e)=>handleCity(e)} >
                                    <option className="selectCiudades" defaultValue={true}>¿Desde dónde...?</option>
                                    {cities.map((city, index) =>
                                    <option value={city.id} key={index}>{city.city}, {city.country}</option> )}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 pb-3 position-relative">
                            <div className="input-group date">
                                <div className="input-group-prepend">
                                    <div className="input-group-text bg-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16"><path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" /><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" /></svg></div>
                                </div>
                                {dateIsSet ?
                                    <input readOnly value={`${format(date[0].startDate, "dd/MM/yyyy")} - ${format(date[0].endDate, "dd/MM/yyyy")}`} type="text" className="form-control" id="fechasForm" placeholder="Fechas" onClick={() => setOpen(open => !open)} />
                                    :
                                    <input readOnly value={`check out - check in`} type="text" className="form-control" id="fechasForm" data-testid="dates-input" placeholder="Fechas" onClick={handleClickIntput} />
                                }
                            </div>
                            <div ref={refOutside}>
                                {open && <DateRange
                                    className="position-absolute date-range"
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    rangeColors={["rgb(242, 112, 77)"]}
                                    months={1}
                                    minDate={addDays(new Date(), -0)}
                                    direction="horizontal"
                                />}
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <div className="d-grid gap-2">
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary mb-2 px-5 fw-bold">Buscar auto</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            
            
        </section>
    )

}

export default Buscador;