import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import ProductContent from '../components/ProductContent';
import ProductInfo from '../components/ProductInfo';
import Loader from '../components/Loader';
import { getSaleProducts, getProductsByStatus } from '../redux/action/productAction';

const Products = (props) => {

    const [price, setPrice] = useState([])

    useEffect(() => {
        props.getSaleProducts();
        props.getProductsByStatus();
    }, [])


    return (
        
        <div className={`product-manager`}>
            <Navbar />
            <div className="info-box d-flex">
                <div className="left-box">
                    <ProductContent />
                </div>
                <div className="right-box border-left">
                    <div className="info-wrap">
                        <table className="table text-center  table-striped table-hover table-borderless">
                            <tbody>
                                <tr className="bg-white">
                                    <th className="text-center">№</th>
                                    <th className="text-center">Nomi</th>
                                    <th className="text-center">Soni</th>
                                    <th className="text-center">Narxi</th>
                                    <th className="text-center">O'chirish</th>
                                </tr>
                                {
                                    props.productInfos.length === 0?
                                    <Loader/>:
                                    props.productInfos.map((info, index) => <ProductInfo 
                                            key={info.id} 
                                            info={info} 
                                            index={index} 
                                            price={price} 
                                            setPrice={setPrice}
                                        />)
                                }
                            </tbody>
                        </table>
                    </div>
                        <div className="common-price w-100 d-flex justify-content-between">
                            <span className="d-inline-block">Jami narx: </span>
                            <span className="d-inline-block">{props.productsPrice.reduce((a,b) => a+b)} so'm</span>
                        </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        productsPrice: state.product.productsPrice,
        productInfos: state.product.productInfos,
        isSearching: state.product.isSearching,

    }
}

export default connect(mapStateToProps, {getSaleProducts, getProductsByStatus})(Products);