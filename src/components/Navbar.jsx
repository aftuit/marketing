import React, { useRef } from 'react';
import { Link } from "react-router-dom"
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import PrintIcon from '@material-ui/icons/Print';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import "../style/search-bar.css"
import { connect } from 'react-redux';
import { updateState, addSearchedProducts, getSaleProducts } from '../redux/action/productAction';

const Navbar = (props) => {



    const onFocus = useRef(null)

    const setSearch = () => {
        props.updateState({ isSearching: !props.isSearching, searchingValue: "" });
        onFocus.current.focus();

    }


    return (
        <div className="navigation-nav">
            <nav className="navbar bg-info">
                <div className="left-side align-items-center d-flex">
                    <button onClick={() => props.updateState({ canvasMenu: !props.canvasMenu })} className="navbar-brand btn">
                        {
                            props.canvasMenu ? <CloseIcon className="text-white" /> :
                                <MenuIcon className="text-white" />
                        }
                    </button>
                    <Link to="/" className="navbar-link text-white mx-3">Продажа</Link>
                    <Link to="/" className="navbar-link text-white mx-3">Быстрые товары</Link>
                    <div className={`search-box d-block ml-auto ${props.isSearching ? 'active' : ''}`}>

                        <button href="#" className="search-btn" onClick={setSearch}><SearchIcon /></button>
                        <input
                            ref={onFocus}
                            className="search-txt"
                            type="search"
                            value={props.searchingValue}
                            placeholder="Qidiruv..."
                            onChange={(e) => props.updateState({ searchingValue: e.target.value })}
                        />
                    </div>
                </div>
                <div className="right-side d-flex ml-auto">
                    {/* {
                        props.selectItems.length > 0 &&
                        <button type="button" className="btn" onClick={() => props.deleteItemsByGroup()} >
                            <DeleteIcon className="text-danger" />
                        </button>
                    } */}

                    <button type="button" className="btn">
                        <InfoIcon className="text-white" />
                    </button>

                    <button type="button" className="btn">
                        <PrintIcon className="text-white" />
                    </button>

                    <button type="button" className="btn">
                        <ReceiptIcon className="text-white" />
                    </button>

                </div>
            </nav>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        searchInProducts: state.product.searchInProducts,
        canvasMenu: state.product.canvasMenu,
        isSearching: state.product.isSearching,
        searchingValue: state.product.searchingValue,
        selectItems: state.product.selectItems,
    }
}

export default connect(mapStateToProps, { updateState, addSearchedProducts, getSaleProducts })(Navbar);