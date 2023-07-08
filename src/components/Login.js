import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Footer";
import tecsup from './assets/img/tecsup.jpg';
import './assets/css/Login.css';


const Login = () => {
    const [email, emailupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);
    const ProceedLoginusingAPI = (e) => {

        //Uso de Api
        e.preventDefault();
        if (validate()) {
            let inputobj = { "email": email, "password": password };
            fetch("http://localhost:8095/api/v1/usuario/login", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Crredenciales invalidos');
                } else {
                    //toast.success('login Exitoso');
                    sessionStorage.setItem('username', email);
                    sessionStorage.setItem('jwttoken', resp.jwtToken);
                    usenavigate('/')
                }
            }).catch((err) => {
                toast.error('Fallo inicio sesion' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Ingresa usuario');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Ingresa password');
        }
        return result;
    }
    return (

        <div class='body'>
            <div class="wrapper">
                <svg>
                    <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                        TecMedia
                    </text>
                </svg>
            </div>
            <div class="text-center pt-3">
                <div class="row">
                    <div class="col">
                        <div className="row"  >
                            <div className="col-md-24 img-container" id='img'>
                                <img src={tecsup}></img>
                            </div>
                        </div>
                    </div>
                    <div class="col contenedor">
                        <div className="" id='colu' >
                            <div className="Formulario">
                                <h2>Iniciar Sesion</h2>
                                <form onSubmit={ProceedLoginusingAPI} className="container">
                                    <div className="email">
                                        <label>Email: </label>
                                        <input value={email} onChange={e => emailupdate(e.target.value)} required />
                                    </div>
                                    <div className="password">
                                        <label>Contraseña:</label>
                                        <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} required></input>
                                    </div>

                                    <input type="submit" value="iniciar" />
                                    <div className="registrar">
                                        Quiero el registro el <a href='/register'>registro</a>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div><br/>
                <Footer />
            </div>
        </div>

    );

}

export default Login;