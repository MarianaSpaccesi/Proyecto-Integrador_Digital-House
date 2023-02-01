import React from 'react';
import './notfound.css';

const NotFound = () => {
    return(
    <div className="notfound">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="text-center">
                                <div className="card-body py-5 px-5">
                                    <i className="bi bi-emoji-frown-fill text-primary" id="notFoundIcon"></i>
                                    <h5 className="card-title fs-1 fw-bold text-secondary pt-3">Oops! error 404</h5>
                                    <p className="card-text fs-5 fw-bold text-secondary">La pagina a la que intentas acceder no existe.</p>
                                    <div className="d-grid gap-2 col-lg-5 col-md-12 mx-auto">
                                    <a href="/" className="btn btn-primary fw-bold">Regresar al inicio</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default NotFound;