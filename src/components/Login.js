

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
                    toast.error('Login failed, invalid credentials');
                } else {
                    toast.success('Success');
                    sessionStorage.setItem('username', email);
                    sessionStorage.setItem('jwttoken', resp.jwtToken);
                    usenavigate('/')
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
    
        <div class='body'>
               
            <div class="container-fluid header">
                <h1 className='text-center fw-bold'>TCMFriends</h1>
            </div >          
            <div class="container text-center pt-3">                
                <div class="row">
                    <div class="col">
                        <div className="row"  >
                            <div className="col-md-24 container img-container" id='img'>
                            <img src={tecsup}></img> 
                            </div>
                        </div>
                    </div>
                    <div class="col">            
                        <div className="col-md-18" id='colu' >                            
                                <div className=" Formulario">
                                    <h2>User Login</h2>                                    
                                    <form onSubmit={ProceedLoginusingAPI} className="container">
                                        <div className="email">
                                            <label>Email: </label>
                                            <input value={email} onChange={e => emailupdate(e.target.value)} required />
                                        </div>
                                        <div className="password">
                                            <label>Password:</label>
                                            <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} required></input>
                                        </div>                                
                                        
                                        <input type="submit" value="iniciar"/>
                                        <div className="registrar">
                                            Quiero el registro el <a href='/register'>registro</a>                                                                                    
                                        </div>
                                    </form>                                    
                                </div>
                            
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>

    );

}

export default Login;