import React from 'react';
import './adminSuccess.css';

const AdminSuccess = () => {
    return(
        
            <div className="success">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="card text-center">
                                <div className="card-body py-5 px-5">
                                    <i className="bi bi-emoji-laughing-fill text-primary" id="successIcon"></i>
                                    <p className="card-text fs-4 fw-bold pt-2 text-secondary">Tu propiedad se ha creado con exito.</p>
                                    <div className="d-grid gap-2 col-lg-5 col-md-12 mx-auto">
                                    <a href="/" className="btn btn-primary fw-bold">volver al inicio</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default AdminSuccess;