import React from 'react';
import {Link} from "react-router-dom"
import MenuIcon from '@material-ui/icons/Menu';

// import TelegramIcon from '@material-ui/icons/Telegram';

import InfoIcon from '@material-ui/icons/Info';
import PrintIcon from '@material-ui/icons/Print';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SearchIcon from '@material-ui/icons/Search';
const Navbar = () => {
    return (
        <div className="navigation-nav">
            <nav className="navbar bg-info">
             <div className="left-side align-items-center">
               <button className="navbar-brand btn">
                    <MenuIcon className="text-white"/>
                </button>
                <Link to="/" className="navbar-link text-white mx-3">Prodaja</Link>
                <Link to="/" className="navbar-link text-white mx-3">bistriy tovari</Link>
               </div>
               <div className="right-side d-block ml-auto">
                   <button type="button" className="btn">
                        <InfoIcon className="text-white" />
                   </button>

                   <button type="button" className="btn">
                        <PrintIcon className="text-white" />
                   </button>

                   <button type="button" className="btn">
                        <ReceiptIcon className="text-white"/>
                   </button>

                   <button type="button" className="btn">
                        <SearchIcon className="text-white"/>
                   </button>
               </div> 
            </nav>
        </div>
    );
};

export default Navbar;