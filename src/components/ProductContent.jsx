import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import { getProductsByStatus, searchInProducts, moveProductsByStatus, updateState } from '../redux/action/productAction';
const ProductContent = (props) => {


    return (
        <div className={`product-wrap  ${props.isSearching && " searching"}`}>
            <div className={`canvas-menu bg-dark ${props.canvasMenu && " show"}`} bg-dark >
                <ul className="nav flex-column">
                    <li className="nav-item"><Link to="/" className="nav-link text-light">Link 1</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link text-light">Link 2</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link text-light">Link 3</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link text-light">Link 4</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link text-light">Link 5</Link></li>
                </ul>
            </div>
            <div className={`container`}>
                <div className="row">
                    {
                        props.isSearching ?
                            <>
                                {
                                    props.searchingValue === "" ?
                                        props.productsByStatus.map(product => {
                                            return (

                                                <div
                                                    key={product.id}
                                                    className="col-3 my-2"
                                                    onClick={() => props.moveProductsByStatus(product.id)}
                                                >
                                                    <div className="card">
                                                        <div className="card-body text-center">
                                                            {product.price} so'm
                                                        </div>
                                                        <div className="card-footer text-center">{product.name}</div>
                                                    </div>
                                                </div>
                                            )
                                        }) :
                                        props.productsByStatus.filter(item => item.name.toLowerCase().includes(props.searchingValue.toLowerCase()))
                                            .map(product => {
                                                return (

                                                    <div
                                                        key={product.id}
                                                        className="col-3 my-2"
                                                        onClick={() => props.moveProductsByStatus(product.id)}
                                                    >
                                                        <div className="card">
                                                            <div className="card-body text-center">
                                                                {product.price} so'm
                                                            </div>
                                                            <div className="card-footer text-center">{product.name}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                }
                            </> :
                            props.productsByStatus.map(product => {
                                return (
                                    (product.status === "quick") &&
                                    <div
                                        key={product.id}
                                        className="col-3 my-2"
                                        onClick={() => props.moveProductsByStatus(product.id)}
                                    >
                                        <div className="card">
                                            <div className="card-body text-center">
                                                {product.price} so'm
                                            </div>
                                            <div className="card-footer text-center">{product.name}</div>
                                        </div>
                                    </div>
                                )
                            })
                    }



                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        productsByStatus: state.product.productsByStatus,
        canvasMenu: state.product.canvasMenu,
        isSearching: state.product.isSearching,
        searchingValue: state.product.searchingValue
    }
}

export default connect(mapStateToProps, { getProductsByStatus, searchInProducts, moveProductsByStatus, updateState })(ProductContent);