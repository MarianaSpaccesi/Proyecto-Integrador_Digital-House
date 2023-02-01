import React, { useState, useEffect } from 'react';
import Card from '../cards/Card';
import './body.css';
import CategoryCard from '../cards/CategoryCard';
import productEndpoints from '../../endpoints/product';
import categoryEndpoints from '../../endpoints/category';


const Body = () => {
    const [list, setList] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getProductsList = async() => {
            const response = await productEndpoints.getProducts();
            setList(response);
        }
        getProductsList();
    }, []);

    useEffect(() => {
        const getCategories = async() => {
            const response = await categoryEndpoints.getCategories();
            setCategories(response);
        }
        getCategories(list);
    }, []);

    return (
        <div className="p-0 m-0 border-0" id="bodySection">
            
            <div className="container">
                <div className="row">
                    <div className="col-12 py-5">
                        <h2 className="text-start fs-5">Buscar por tipo de auto</h2>
                        <div className="row">
                            {categories.map(category => <div className="col-12 col-lg-3 col-md-6 g-4" key={category.id}><CategoryCard props={category}/></div>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 py-5">
                        <h2 className="text-start fs-5">Recomendaciones</h2>
                        <div className="row">
                            {list.map(item => <div className="col-12 col-md-6 g-4" key={item.id}><Card props={item}/></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body;
