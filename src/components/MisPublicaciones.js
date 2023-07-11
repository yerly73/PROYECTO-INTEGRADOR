import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const MisPublicaciones = () => {
    const [publicacion, setPublicaciones] = useState([]);
    const username = sessionStorage.getItem('username'); // Establece el valor del nombre de usuario que deseas filtrar
    const navigate = useNavigate();

    useEffect(() => {
        const MisPublicaciones = async () => {
            try {
                const response = await fetch(`http://localhost:8095/api/v1/publicacion/email/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setPublicaciones(data);
                } else {
                    console.error('Error en la respuesta de la API:', response.status);
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        if (username) {
            MisPublicaciones();
        }
    }, [username]);

    const handleDelete = (publicacionid) => {
        fetch(`http://localhost:8095/api/v1/publicacionfavorito/eliminar/${publicacionid}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.ok) {
                    toast.success('Publicación eliminada');
                    window.location.reload()
                } else {
                    throw new Error('Error al eliminar la publicación');
                }
            })
            .catch((err) => {
                toast.error('Error: ' + err.message);
            });

    };


    return (
        <div className="publicaciones_contenido">
            <div className="tituloPub">
                <h6>Mis Publicaciones</h6>
            </div>
            {publicacion.length ? (
                <ul>
                    {publicacion.map((item) => (
                        <div key={item.id} className="lista_pub text-center">
                            <div className="titulo_publicacion">
                                <h5>
                                    <span>Categoria:</span>{" "}
                                    <span className="titulo_p">{item.categoria}</span>
                                </h5>
                            </div>
                            <div className="contenido_publicacion">
                                <div className="text-center">
                                    <h5>{item.titulo}</h5>
                                </div>
                                <p className="card-text">{item.contenido}</p>
                                <a target="_blank" href={item.url}>
                                    {item.url}
                                </a>
                            </div>
                            <div className="card-footer text-body-secondary">
                                <div className="date">
                                    <h6>{item.fecha_pub}</h6>
                                    <h6>{item.email}</h6>
                                </div>
                            </div>
                            <hr />
                            <div className="links btn-group" role="group" aria-label="Basic example">
                                <button className="button_pf" type="button" onClick={() => handleDelete(item.publicacionid)}>
                                    <img
                                        className="imgevent"
                                        src="https://cdn-icons-png.flaticon.com/128/263/263417.png"
                                        alt="Añadir a favoritos"
                                    />
                                </button>
                                <button className="button_editar" type="button">
                                    <Link to={`/editarpublicacion/${item.publicacionid}`}>
                                        <img
                                            className="imgevent"
                                            src="https://cdn-icons-png.flaticon.com/128/2921/2921222.png"
                                            alt="Añadir a favoritos"
                                        />
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No has hecho ninguna publicacion.</p>
            )}
        </div>
    );
};

export default MisPublicaciones;
