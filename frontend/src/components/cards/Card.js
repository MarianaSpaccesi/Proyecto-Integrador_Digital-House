import React from 'react'
import LikeBtn from '../actions/LikeBtn'
import './Card.css'
import { Link } from "react-router-dom";


const Card = ({props}) => {
    return (
        <div className="card d-flex flex-lg-row">
            <div className="image position-relative">
                <img src={props.images[0].urlImage} alt="car" />
                <LikeBtn/>
            </div>
            <div className="card-body">
                <small className="text-uppercase text-secondary">{props.category.title}</small>
                <h1>{props.title}</h1>
                <p><i className="fa-solid fa-location-dot" id="location-icon"></i>{props.city.city}, {props.city.country}</p>
                <p>{props.description}</p>
                <div className="d-grid gap-2">
                    <Link to={`/product/${props.id}`}><button className="btn btn-primary w-100">Ver detalle</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Card
