import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import album from './assets/img/album.jpg';
import './assets/css/Register.css';

const Register = () => {

    const [nombre, nombrechange] = useState("");
    const [apellido, apellidochange] = useState("");
    const [email, emailchange] = useState("");
    const [password, passwordchange] = useState("");
    const [ciclo, ciclochange] = useState("");
    const [carrera, carrerachange] = useState("");


    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Por favor ingresa los datos en ';
        if (nombre === null || nombre === '') {
            isproceed = false;
            errormessage += ' Nombre';
        }
        if (apellido === null || apellido === '') {
            isproceed = false;
            errormessage += ' apellido';
        }
        if (ciclo === null || ciclo === '') {
            isproceed = false;
            errormessage += ' ciclo';
        }
        if (carrera === null || carrera === '') {
            isproceed = false;
            errormessage += ' carrera';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' email';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' password';
        }
        return isproceed;
    }


    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { nombre, apellido, email, password, ciclo, carrera };
        if (IsValidate()) {
            // Validación del dominio del correo electrónico
            if (email.endsWith('@tecsup.edu.pe')) {
                fetch("http://tecmediateam.us-east-1.elasticbeanstalk.com/api/v1/usuario/save", {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(regobj)
                }).then((res) => {
                    toast('Registro Correcto!', {
                        icon: '😊',
                    });
                    navigate('/login');
                }).catch((err) => {
                    toast('Error al registrarte!', {
                        icon: '🫠',
                    });
                });
            } else {
                toast('Ingresa un correo con dominio "tecsup.edu.pe"', {
                    icon: '🚫',
                });
            }
        }
    }
    return (
        <div className="body">
            <div class="wrapper">
                <svg>
                    <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                        TecMedia
                    </text>
                </svg>
            </div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <div class="row">
                        <div className="row"  >
                            <div className="col-md-24 container img-alum" id="img">
                                <img src={album}></img>
                            </div>
                        </div>
                    </div>
                    <div className="plantilla">
                        <div className="text-center">
                            <h3>Registro de Usuario</h3><hr />
                        </div>
                        <form className="container" onSubmit={handlesubmit}>

                            <div className="row">
                                <div className="col-lg-6 ">
                                    <div className="nombre">
                                        <strong><label>Nombre:</label></strong>
                                        <input required value={nombre} onChange={e => nombrechange(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="apellido">
                                        <strong><label>Apellido:</label></strong>
                                        <input required value={apellido} onChange={e => apellidochange(e.target.value)} ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="ciclo">
                                        <strong><label>Ciclo:</label></strong>
                                        <select required className="form-select" aria-label="Default select example" value={ciclo} onChange={e => ciclochange(e.target.value)}>
                                            <option selected></option>
                                            <option value="I">I</option>
                                            <option value="II">II</option>
                                            <option value="III">III</option>
                                            <option value="IV">IV</option>
                                            <option value="V">V</option>
                                            <option value="VI">VI</option>
                                            <option value="Egreso">Egresado</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="carrera">
                                        <label><strong>Carrera:</strong></label>
                                        <select required className="form-select" aria-label="Default select example" value={carrera} onChange={e => carrerachange(e.target.value)}>
                                            <option selected></option>
                                            <option value="Diseño y Desarrollo de Software">Diseño y Desarrollo de Software</option>
                                            <option value="Diseño Industrial">Diseño Industrial</option>
                                            <option value="Big Data y Ciencia de Datos">Big Data y Ciencia de Datos</option>
                                            <option value="Diseño y Desarrollo de Simuladores y Videojuegos">Diseño y Desarrollo de Simuladores y Videojuegos</option>
                                            <option value="Administración de Redes y Comunicaciones">Administración de Redes y Comunicaciones</option>
                                            <option value="Egresado">Egresado</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="correo">
                                        <label><strong>Email:</strong></label>
                                        <input
                                            required
                                            value={email}
                                            onChange={e => emailchange(e.target.value)}
                                            type="email"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className=" contraseña">
                                        <label><strong>Contraseña:</strong></label>
                                        <input required value={password} onChange={e => passwordchange(e.target.value)} type="password"></input>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" >Registrarse</button>
                        </form><br></br>
                        <div className="text-center">
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <h6>
                                    Regresar a <Link to={'/login'} className="link">Login</Link>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div className="row"  >
                            <div className="col-md-24 container img-alum1" id="img">
                                <img src={album}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;