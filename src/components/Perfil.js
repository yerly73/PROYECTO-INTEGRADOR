import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
const Perfil = () => {
    const [usuario, setUsuario] = useState(null);
    const username = sessionStorage.getItem('username');

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

    return (
        <div className="">
            {usuario ? (
                <div className="container text-center">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-6">
                            <div className="text-center pt-2"><h1>{usuario.nombre} {usuario.apellido}</h1></div>
                            <hr />
                            <div className="text-center pt-2" style={{ paddingBottom: 7 }}>
                                <h8><strong key={usuario.nombre}>Carrera: </strong>{usuario.carrera}</h8><hr />
                                <h8><strong>Ciclo: </strong>{usuario.ciclo}</h8><hr />
                                <h8><strong>Correo: </strong>{usuario.email}</h8><hr />
                                <h8><strong>Descripcion: </strong>{usuario.descripcion}</h8><hr />
                            </div>
                        </div>
                        <div className="col"></div>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button class="btn btn-dark" type="button"><Link to={'/editarperfil'}>Editar Perfil</Link></button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        </div>
    );
};

export default Perfil;