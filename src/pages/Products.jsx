import React  from 'react';
import Navbar from '../components/Navbar';
import ProductContent from '../components/ProductContent';
import ProductInfo from '../components/ProductInfo';

const Products = () => {
    return (
        <div className="product-manager">
            <Navbar/>
            <div className="info-box d-flex">
                 <div className="left-box bg-light">
                    <ProductContent/>
                </div>
                <div className="right-box">
                    <ProductInfo />
                </div>
            </div>
        </div>
    );
};
export default Products;