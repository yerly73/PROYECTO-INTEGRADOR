import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "./Footer";
import tecsup from './assets/img/tecsup.jpg';
import './assets/css/Login.css';

const Login = () => {
  const [email, setEmail] = useState("van@tecsup.edu.pe");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const loginData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch(
        "http://tecmedia-g5b.us-east-1.elasticbeanstalk.com/api/v1/usuario/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
  
      if (response.ok) {
        // La solicitud se realizó con éxito
        // Realizar las acciones necesarias con la respuesta
  
        toast.success('LOGin correcto');
        navigate("/");
      } else {
        toast.error('Credenciales inválidas');
      }
    } catch (error) {
      toast.error('Credenciales inválidas',error);
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <svg>
          <text x="50%" y="50%" dy=".35em" textAnchor="middle">
            TecMedia
          </text>
        </svg>
      </div>
      <div className="text-center pt-3">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-md-24 img-container" id='img'>
                <img src={tecsup} alt="Tecsup" />
              </div>
            </div>
          </div>
          <div className="col contenedor">
            <div id='colu'>
              <div className="Formulario">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="container">
                  <div className="email">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={email !== null ? email : ""}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo electrónico"
                    />                 </div>
                  <div className="password">
                    <label>Contraseña:</label>

                    <input
                      type="password"
                      value={password !== null ? password : ""}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                    />                 </div>
                  <input type="submit" value="Iniciar" />
                  <div className="registrar">
                    ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div><br />
        <Footer />
      </div>
    </div>
  );
};

export default Login;
