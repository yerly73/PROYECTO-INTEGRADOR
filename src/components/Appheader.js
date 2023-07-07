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
        <nav class="navbar navbar-expand-lg bg-body-tertiary header">
            {showmenu &&
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand" href="#"><h1>TecFriends</h1></a>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"><Link to={'/'}>Inicio</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"><Link to={'/perfil'}>Perfil</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Amigos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Informacion</a>
                        </li>
                    </ul>
                    <span>Bievenido <b>{displayusername}</b></span>
                    <button type="button" class="btn"><a href="#" class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                    <Link style={{ float: 'right' }} to={'/login'}>Salir</Link> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg></a></button>
                </div>
            </div>
            }
        </nav>
    );
}

export default Appheader;