import React from 'react';
import './successBooking.css';

const SuccessBooking = () => {
    return(
        
            <div className="success">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="card text-center">
                                <div className="card-body py-5 px-5">
                                    <i className="bi bi-check-circle-fill text-primary" id="successIcon"></i>
                                    <h5 className="card-title fs-3 fw-bold text-primary">¡Muchas gracias!</h5>
                                    <p className="card-text fs-5 fw-bold text-secondary">Su reserva se ha realizado con éxito</p>
                                    <div className="d-grid gap-2 col-lg-5 col-md-12 mx-auto">
                                    <a href="/" className="btn btn-primary fw-bold">ok</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default SuccessBooking;