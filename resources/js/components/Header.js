import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="container">
            <Link className="navbar-brand" to="/">
                laravel課題
            </Link>
        </div>
    );
};

export default Header;
