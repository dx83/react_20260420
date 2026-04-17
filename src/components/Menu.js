import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <h1>메뉴</h1>
            <Link to="/" style={{ marginLeft:"20px"}} >Home</Link>
            <Link to="/login" style={{ marginLeft:"20px"}}>Login</Link>
        </div>
    );
};

export default Menu;