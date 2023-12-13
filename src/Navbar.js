import React from "react";
import './App.css'
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <div class="navbar">
            <div class="navbar-menu">
                <div class="navbar-menu-item-dropdown">
                    <a class = "dropdown-link" href="/">Menu</a>
                    <div class="navbar-menu-item-dropdown-content">
                        <Link to="/About">About</Link>
                        <Link to="/Info">Info</Link>
                        <a href="#">Link 3</a>
                    </div>
                </div>

            </div>
            <a href = "/"  class="navbar-title">Resume Lookup</a>
        </div>
    );
}

export default Navbar;