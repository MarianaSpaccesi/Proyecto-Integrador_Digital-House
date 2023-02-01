import React, { useState, useEffect } from 'react';
import productEndpoints from '../../endpoints/product';
import Card from '../cards/Card';


const ProductSearch = ( { cityid } ) => {
    const [list, setList] = useState([]);
    const [filterList, setFilterList] = useState([]);

    useEffect(() => {
        const getProductsList = async() => {
            const response = await productEndpoints.getProducts();
            setList(response);
        }
        getProductsList();
    }, []);


const filterProducts = () => {
    const filter = list.filter((item) => item.city === cityid);
    setFilterList(filter);
}
    console.log(list);
    console.log(filterList);

    console.log(filterProducts);




    return(
        <div className="p-0 m-0 border-0" id="bodySection">
            
            <div className="container">
                {/* <div className="row">
                    <div className="col-12 py-5">
                        <h2 className="text-start fs-5">Buscar por tipo de auto</h2>
                        <div className="row">
                            {categories.map(category => <div className="col-12 col-lg-3 col-md-6 g-4" key={category.id}><CategoryCard props={category}/></div>)}
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-12 py-5">
                        <h2 className="text-start fs-5">Resultados de tu busqueda</h2>
                        <div className="row">
                            {list.map(item => <div className="col-12 col-md-6 g-4" key={item.id}><Card props={item}/></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSearch;