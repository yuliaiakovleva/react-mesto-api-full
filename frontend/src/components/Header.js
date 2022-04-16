import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Header(props) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            {props.location === "/sign-up" && (
                <Link to="/sign-in" className="header__link">Войти</Link>
            )}
             {props.location === "/sign-in" && (
                <Link to="/sign-up" className="header__link">Зарегистрироваться</Link>
            )}
            {props.loggedIn && (
                <p className="header__login"> {props.email}
                    <Link to="/sign-in" className="header__link" onClick={props.onLogout}>Выйти</Link>
                </p>
            )}
            
        </header> 
    );
}

export default Header;