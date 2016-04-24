import React from 'react';
import { Link } from 'react-router';

const HeaderNav = (props) => (
    <nav className={props.classType}>
        <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/docs">Docs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
    </nav>
);

export default HeaderNav;
