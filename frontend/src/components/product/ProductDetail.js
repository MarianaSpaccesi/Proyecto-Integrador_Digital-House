import React, { useEffect, useState } from 'react';
import './productDetail.css';
import { Link } from "react-router-dom";
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns'
import ImageGallery from 'react-image-gallery';

const ProductDetail = ({ product }) => {

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

    const images = product.images.map(image => ({ original: `${image.urlImage}`, thumbnail: `${image.urlImage}` }))


    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [gallery, setGallery] = useState(false);
    const showGallery = (index) => {
        setGalleryIndex(index);
        setGallery(true)
    }
    const feature = {};
    product.features.forEach(item => {
        feature[item.type] = item.value;
    });

    return (
        <div className="product-detail">
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
                                <Link to="/" className="arrow-back"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" /></svg></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* location */}
            <div className="detail-location">
                <div className="container py-2 mb-5">
                    <div className="d-flex align-items-center">
                        <div className="row">
                            <div className="col">
                                <span className="location-icon fs-5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                </svg> <span className="location-text fs-5">{product.city.province}</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-12">
                            <p className="location-text fs-6 ps-4 m-0">Ubicacion exacta</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* gallery */}
            <div className="container">
                <div className="gallery-grid desktop-gallery">
                    <div className="item-a">
                        <img src={product.images[0].urlImage} alt="" onClick={() => showGallery(0)} />
                    </div>
                    {product.images.slice(1).map((img, index) => <img src={img.urlImage} key={index} alt="auto" onClick={() => showGallery(index + 1)} />)}
                    <button type="submit" className="link-gallery btn btn-outline-light" onClick={() => showGallery(0)}>Ver más</button>
                </div>
                {gallery && windowSize > 769 && <div className="background-modal">
                    <div className="modal-gallery">
                        <i className="fa fa-close" onClick={() => setGallery(!gallery)} />
                        <ImageGallery items={images}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            showIndex={true}
                            positionIndex={'bottom'}
                            startIndex={galleryIndex}
                            lazyLoad={true}
                            className="desktop-gallery"
                        />
                    </div>
                </div>}
                {windowSize < 769 && <ImageGallery items={images}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showNav={false}
                    showIndex={true}
                    positionIndex={'bottom'}
                    startIndex={galleryIndex}
                    lazyLoad={true}
                    autoPlay={true}
                    showThumbnails={false}
                    showBullets={true}
                />}
            </div>
            {/* description */}
            <div className="detail-description">
                <div className="container">
                    <div className="row py-5">
                        <h2 className="pb-1 fs-4">Alquila el auto de tus sueños</h2>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
            {/* features */}
            <div className="detail-features">
                <div className="features-border">
                    <div className="container">
                        <h2 className="pb-1 fs-4">Caracteristicas del auto</h2>
                    </div>
                </div>
                <div className="container py-5 mb-4">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-6 pt-3 pb-4 text-primary">
                            <i className="fa-solid fa-screwdriver-wrench"></i>
                            <span className="text-secondary ps-2" id="features-text"><b>Motor:</b> {feature.motorType}</span>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6 pt-3 pb-4 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-car-front-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189l.956-1.913A.5.5 0 0 1 4.309 3h7.382a.5.5 0 0 1 .447.276l.956 1.913a.51.51 0 0 1-.497.731c-.91-.073-3.35-.17-4.597-.17-1.247 0-3.688.097-4.597.17a.51.51 0 0 1-.497-.731Z" /></svg>
                            <span className="text-secondary ps-2" id="features-text"><b>Modelo:</b> {feature.model}</span>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6 pt-3 pb-4 text-primary">
                            <svg className="svg-image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                <path d="M148 20H92L36 84v80c0 8.836 7.164 16 16 16h96c8.836 0 16-7.164 16-16V36c0-8.837-7.164-16-16-16zm-8 104h-24a8 8 0 0 1-8-8c0-10.66 12.259-8 32-8c10.576 0 10.592 16 0 16zm8-32H52l48-56c38.289 0 48-2.65 48 7.989V92z"></path></svg>
                            <span className="text-secondary ps-2" id="features-text"><b>Puertas:</b> {feature.doors}</span>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6 pt-3 pb-4 text-primary">
                            <i className="fa-solid fa-users"></i>
                            <span className="text-secondary ps-2" id="features-text"><b>Pasajeros:</b> {feature.numPassengers} </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-6 pt-3 pb-4 text-primary">
                            <svg className="svg-image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M30.3 50.78a4.25 4.25 0 00-.2 1.1v48a6 6 0 006 6h58v42c0 .4.2.7.2 1.1a16 16 0 1011.6 0a4.25 4.25 0 00.2-1.1v-42H158v42c0 .4.2.7.2 1.1a16 16 0 1011.6 0a4.25 4.25 0 00.2-1.1v-96c0-.4-.2-.7-.2-1.1a16 16 0 10-11.6 0a4.25 4.25 0 00-.2 1.1v42h-52v-42c0-.4-.2-.7-.2-1.1a16 16 0 10-11.6 0a4.25 4.25 0 00-.2 1.1v42H42v-42c0-.4-.2-.7-.2-1.1A16 16 0 1020 35.88a16.1 16.1 0 0010.3 14.9z"></path></svg>
                            <span className="text-secondary ps-2" id="features-text"><b>Transmision:</b> {feature.transmission}</span>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6 pt-3 pb-4 text-primary">
                            <i className="fa-solid fa-map-location-dot"></i>
                            <span className="text-secondary ps-2" id="features-text"><b>GPS:</b> {feature.gps}</span>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6 pt-3 pb-4 text-primary">
                            <i className="fa-solid fa-wind"></i>
                            <span className="text-secondary ps-2" id="features-text"><b>Aire acondicionado:</b> {feature.airConditioner}</span>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6 pt-3 pb-4 text-primary">
                            <i className="fa-solid fa-road"></i>
                            <span className="text-secondary ps-2" id="features-text"><b>Autonomia:</b> {feature.autonomy}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* booking calendar */}
            <div className="detail-calendar">
                <div className="container pt-3">
                    <h2 className="pt-3 fs-4">Fechas disponibles</h2>
                </div>
                <div className="container pt-3 pb-5 mb-5">
                    <div className="row ms-auto">
                        {windowSize > 771 ? <div className="col-xl-8 col-lg-9 col-md-6 py-3 pe-4 text-secondary desktop-bookingCalendar">
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
                        <div className="col-xl-4 col-lg-3 col-md-12 py-3 text-secondary d-flex align-items-center">
                            <div className="row">
                                <div className="col-lg-12 col-md-6 col-sm-12 py-3 pe-4 text-secondary">
                                    <p className="lh-sm fs-5 m-0">Agrega tu rango de fecha para obtener precios exactos</p>
                                </div>
                                <div className="col-lg-12 col-md-6 col-sm-12 py-3 text-secondary d-grid mx-auto gap-5">
                                    <Link to={`/booking/${product.id}`}><button type="submit" className="btn btn-primary mb-5 px-5 fw-bold text-nowrap w-100">Iniciar reserva</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* politics */}
            <div className="detail-politics">
                <div className="politics-border">
                    <div className="container mb-4">
                        <h2 className="pb-1 fs-4">Lo que tenes que saber</h2>
                    </div>
                </div>
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
};

export default ProductDetail;