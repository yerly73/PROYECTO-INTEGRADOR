import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Footer";

const Editarperfil = () => {

    const [usuario, setUsuario] = useState(null);
    const username = sessionStorage.getItem('username');

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            try {
                const response = await fetch(`http://localhost:8095/api/v1/usuario/email/${username}`);
                if (response.ok) {
                    const data = await response.json();
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


    const [nombre, nombrechange] = useState("");
    const [apellido, apellidochange] = useState("");
    const [email, emailchange] = useState("");
    const [password, passwordchange] = useState("");
    const [ciclo, ciclochange] = useState("");
    const [carrera, carrerachange] = useState("");
    const [descripcion, descripcionchange] = useState("");


    const updateData = () => {


        const updatedData = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password,
            ciclo: ciclo,
            carrera: carrera,
            descripcion: descripcion
        };

        fetch(`http://localhost:8095/api/v1/usuario/actualizar/${usuario.usuarioid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(responseData => {
                setUsuario(responseData);
                toast.success('Actualizado correctamente.')
                navigate('/perfil');
            })
            .catch(error => {
                console.error('Error al actualizar los datos:', error);
                toast.success('Error al actualizar!')
            });
    };

    return (
        <div className="">
            <div className="offset-lg-3 col-lg-6">
            </div>
            <div>
                {usuario ? (
                    <div>
                        <form className="container" onSubmit={updateData}>
                            <div className="">
                                <div className="text-center"><br />
                                    <h3>Actualizar Datos</h3><hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <strong>Nombre:</strong>
                                                <input value={usuario.nombre} onChange={e => nombrechange(e.target.value)} className="form-control"></input>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <strong>Apellido:</strong>
                                                <input value={usuario.apellido} onChange={e => apellidochange(e.target.value)} className="form-control"></input>
                                            </div><br />
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <strong>Ciclo:</strong>
                                                <select className="form-select" aria-label="Default select example" value={usuario.ciclo} onChange={e => ciclochange(e.target.value)}>
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
                                                <select required className="form-select" aria-label="Default select example" value={usuario.carrera} onChange={e => carrerachange(e.target.value)}>
                                                    <option selected value="Diseño y Desarrollo de Software">Diseño y Desarrollo de Software</option>
                                                    <option value="Diseño Industrial">Diseño Industrial</option>
                                                    <option value="Big Data y Ciencia de Datos">Big Data y Ciencia de Datos</option>
                                                    <option value="Diseño y Desarrollo de Simuladores y Videojuegos">Diseño y Desarrollo de Simuladores y Videojuegos</option>
                                                    <option value="Administración de Redes y Comunicaciones">Administración de Redes y Comunicaciones</option>
                                                    <option value="Egresado">Egresado</option>
                                                </select><br />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <strong>Email:</strong>
                                                <input readOnly value={usuario.email} onChange={e => emailchange(e.target.value)} type="email" className="form-control"></input>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <strong>Contraseña:</strong>
                                                <input value={usuario.password} onChange={e => passwordchange(e.target.value)} className="form-control" type="password"></input>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group"><br />
                                                <strong>Descripcion:</strong>
                                                <textarea value={usuario.descripcion} onChange={e => descripcionchange(e.target.value)} className="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=""><hr />
                                    <div class="d-grid gap-2 col-6 mx-auto">
                                        <button type="submit" class="btn btn-success">Actualizar</button>
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