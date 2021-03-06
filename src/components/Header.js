import React from "react";
import { Link } from "react-router-dom";

const Header = ( {isAuthenticated, onLogout }) => {
    return (
        <header className="App-header">
            <ul className="container">
                <li key="home">
                    <Link to="/">Dog Fu Blog</Link>
                </li>
                {isAuthenticated ? (
                    <>
                <li key="new">
                    <Link to="/new">New Post</Link>
                </li>
                <li key="logout">
                    <button 
                        className="header"
                        onClick={e => {
                            e.preventDefault();
                            onLogout();
                        }
                    }
                    >
                        Logout
                    </button>
                </li>
                </>
                ) : (
                <li key="login">
                    <Link to="/login">Login</Link>
                </li>
                )
            }
            {!isAuthenticated && (  
            <li key="newUser">
                <Link to="/newUser">Sign Up!</Link>
            </li> 
        )}
            </ul>
        </header>    
    );
}

export default Header;

