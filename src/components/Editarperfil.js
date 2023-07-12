import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import toast, { Toaster } from 'react-hot-toast';
const Editarperfil = () => {

    const [usuario, setUsuario] = useState(null);
    const username = sessionStorage.getItem('username');

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [ciclo, setCiclo] = useState('');
    const [carrera, setCarrera] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            try {
                const response = await fetch(`http://tecmediateam.us-east-1.elasticbeanstalk.com/api/v1/usuario/email/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    const { nombre, apellido, ciclo, carrera, descripcion } = data;
                    setNombre(nombre);
                    setApellido(apellido);
                    setCiclo(ciclo);
                    setCarrera(carrera);
                    setDescripcion(descripcion);
                    setUsuario(data);
                } else {
                    console.error('Error en la respuesta de la API:', response.status);
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        if (username) {
            obtenerDatosUsuario();
        }
    }, [username]);
    const handleEditar = async (e) => {
        e.preventDefault();

        const datosActualizados = {
            nombre,
            apellido,
            ciclo,
            carrera,
            descripcion
        };

        try {
            const response = await fetch(`http://tecmediateam.us-east-1.elasticbeanstalk.com/api/v1/usuario/actualizar/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosActualizados),
            });

            if (response.ok) {
                toast.success('Actualización correcta.');
                navigate("/")
            } else {
                toast.warning('Error al actualizar.');
            }
        } catch (error) {
            console.log('Error al enviar la solicitud de actualización:', error);
        }
    };

    return (
        <div className="">
            <div className="offset-lg-3 col-lg-6">
            </div>
            <div>
                {usuario ? (
                    <div>
                        <form className="container" onSubmit={handleEditar}>
                            <div className="">
                                <div className="text-center"><br />
                                    <h3>Actualizar Datos</h3><hr />
                                </div>

                                <div className="card-body text-start">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <strong>Email:</strong>
                                                <input readOnly value={usuario.email} type="email" className="form-control"></input>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <strong>Nombre:</strong>
                                                <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control"></input>
                                            </div><br />
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <strong>Apellido:</strong>
                                                <input value={apellido} onChange={(e) => setApellido(e.target.value)} className="form-control"></input>
                                            </div><br />
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <strong>Ciclo:</strong>
                                                <select className="form-select" aria-label="Default select example" value={ciclo} onChange={e => setCiclo(e.target.value)}>
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
                                            <div hidden className="form-group">
                                                <strong>Contraseña:</strong>
                                                <input hidden value={usuario.password} className="form-control" type="password"></input>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label><strong>Carrera:</strong></label>
                                                <select required className="form-select" aria-label="Default select example" value={carrera} onChange={e => setCarrera(e.target.value)}>
                                                    <option selected value="Diseño y Desarrollo de Software">Diseño y Desarrollo de Software</option>
                                                    <option value="Diseño Industrial">Diseño Industrial</option>
                                                    <option value="Big Data y Ciencia de Datos">Big Data y Ciencia de Datos</option>
                                                    <option value="Diseño y Desarrollo de Simuladores y Videojuegos">Diseño y Desarrollo de Simuladores y Videojuegos</option>
                                                    <option value="Administración de Redes y Comunicaciones">Administración de Redes y Comunicaciones</option>
                                                    <option value="Egresado">Egresado</option>
                                                </select>
                                            </div>
                                            <div className="form-group"><br />
                                                <strong>Descripcion:</strong>
                                                <input value={descripcion} onChange={e => setDescripcion(e.target.value)} className="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sumit_button"><hr />
                                    <div class="d-grid gap-2 col-6 mx-auto">
                                        <button type="submit" className="btn btn-success">Actualizar</button>
                                    </div><br />
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <p>Cargando datos del usuario...</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Editarperfil;