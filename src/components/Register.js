import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Footer";

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
            //console.log(regobj);
            fetch("http://localhost:8095/api/v1/usuario/save", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }
    return (
        <div className="">
                <div class="wrapper">
                <svg>
                    <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                        TecMedia
                    </text>
                </svg>
            </div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="">
                        <div className="text-center"><br />
                            <h3>Registro de Usuario</h3><hr />
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <strong>Nombre:</strong>
                                        <input required value={nombre} onChange={e => nombrechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <strong>Apellido:</strong>
                                        <input required value={apellido} onChange={e => apellidochange(e.target.value)} className="form-control"></input>
                                    </div><br/>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <strong>Ciclo:</strong>
                                        <select required className="form-select" aria-label="Default select example" value={ciclo} onChange={e => ciclochange(e.target.value)}>
                                            <option selected value="I">I</option>
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
                                    <div className="form-group">
                                        <label><strong>Carrera:</strong></label>
                                        <select required className="form-select" aria-label="Default select example" value={carrera} onChange={e => carrerachange(e.target.value)}>
                                            <option selected value="Diseño y Desarrollo de Software">Diseño y Desarrollo de Software</option>
                                            <option value="Diseño Industrial">Diseño Industrial</option>
                                            <option value="Big Data y Ciencia de Datos">Big Data y Ciencia de Datos</option>
                                            <option value="Diseño y Desarrollo de Simuladores y Videojuegos">Diseño y Desarrollo de Simuladores y Videojuegos</option>
                                            <option value="Administración de Redes y Comunicaciones">Administración de Redes y Comunicaciones</option>
                                            <option value="Egresado">Egresado</option>
                                        </select><br/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <strong>Email:</strong>
                                        <input required value={email} onChange={e => emailchange(e.target.value)} type="email" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <strong>Contraseña:</strong>
                                        <input required value={password} onChange={e => passwordchange(e.target.value)} className="form-control" type="password"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=""><hr/>
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button type="submit" class="btn btn-success">Registrarse</button>
                                <Link to={'/login'} className="btn btn-primary">Iniciar Sesion</Link>
                            </div><br/>
                        </div>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default Register;