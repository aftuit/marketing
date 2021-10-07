import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom" 
import { getProductsByStatus, searchInProducts, moveProductsByStatus, updateState, deleteProductsByStatus } from '../redux/action/productAction';
const ProductContent = (props) => {

    
    return (
        <div className="product-wrap">
            <div className={`canvas-menu bg-dark ${props.canvasMenu && " show"}`} bg-dark >
                <ul className="nav flex-column">
                    <li className="nav-item"><Link to="/" className="nav-link text-light">Link 1</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link text-light">Link 1</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link text-light">Link 1</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link text-light">Link 1</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link text-light">Link 1</Link></li>
                </ul>
            </div>
            <div className="container">
                <div className="row">
                    {
                        props.productsByStatus.map(product => {
                            return (
                                (product.status === "quick") &&
                                <div
                                    key={product.id}
                                    className="col-3 my-2"
                                    onClick={() => props.deleteProductsByStatus(product.id)}
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
    }
}

export default connect(mapStateToProps, { getProductsByStatus, searchInProducts, moveProductsByStatus, updateState, deleteProductsByStatus })(ProductContent);