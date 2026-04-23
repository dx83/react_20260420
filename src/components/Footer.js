import React from 'react';

const Footer = (props) => {

    const { title, copyright, handleClick } = props;

    return (
        <div align="center">
            <hr />
            <p>{title}</p>
            <p>{copyright}</p>
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

export default Footer;