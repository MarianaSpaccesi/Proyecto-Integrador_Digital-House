import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productEndpoints from '../../endpoints/product';
import ProductDetail from './ProductDetail';

const Products = () => {
    const { id } = useParams()
    const [product, setProduct] = useState();

    useEffect(() => {
        const getProduct = async () => {
            const response = await productEndpoints.getProductById(id)
            setProduct(response)
        }
        getProduct()
    }, []);

    return (
        <>
            <div className="products">
                {product && <ProductDetail
                    product={product}
                />}
                
            </div>
        </>
    );
};

export default Products;
