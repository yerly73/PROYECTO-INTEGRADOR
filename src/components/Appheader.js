import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }

    }, [location])
    return (
        <div className="row">
            <div className="col-12">
            <nav class="menu-container">
            <input type="checkbox" aria-label="Toggle menu" />
            <span></span>
            <span></span>
            <span></span>

            <a href="#" class="menu-logo">
                <img src="https://cdn-icons-png.flaticon.com/128/6576/6576146.png" alt="TecMedia" />
            </a>

            <div class="menu">
                <ul>
                    <li>
                        <a href="#inicio">
                        <Link to={'/'}>Inicio</Link>
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://www.tecsup.edu.pe/">
                            Tecsup
                        </a>
                    </li>
                    <li>
                        <a href="#docs">
                        <Link to={'/publicacionesfavoritos'}>Publicaciones Favoritos</Link>
                        </a>
                    </li>
                    <li>
                        <a href="#docs">
                        <Link to={'/mispublicaciones'}>Mis publicaciones</Link>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#login">
                        <Link style={{ float: 'right' }} to={'/login'}>Salir</Link>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
            </div>
        </div>
    );
}

export default Appheader;