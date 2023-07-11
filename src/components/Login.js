import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Footer";
import tecsup from './assets/img/tecsup.jpg';
import './assets/css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const validate = () => {
    if (!email.trim()) {
      toast.warning('Ingresa el correo electrónico');
      return false;
    }
    if (!password.trim()) {
      toast.warning('Ingresa la contraseña');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const loginData = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const response = await fetch("http://localhost:8095/api/v1/usuario/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        toast.error('Credenciales inválidas');
        return;
      }

      const data = await response.json();

      if (Object.keys(data).length === 0) {
        toast.error('Credenciales inválidas');
      } else {
        sessionStorage.setItem('username', email);
        sessionStorage.setItem('jwttoken', data.jwtToken);
        navigate('/');
      }
    } catch (error) {
      toast.error('Fallo inicio de sesión: ' + error.message);
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
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="password">
                    <label>Contraseña:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
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
