import React from 'react'

import './CategoryCard.css'
const CategoryCard = ({props}) => {
    return (
        <div className="card">
            <div className="category-card-image position-relative">
                <img src={props.urlImage} alt="car" />
            </div>
            <div className="card-body category-card">
                <h2 className="mb-0">{props.title}</h2>
                <small>{props.description}</small>
            </div>
        </div>
    )
}

export default CategoryCard