import React, { useState, useEffect } from 'react';
//import { toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const MisPublicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const username = sessionStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const response = await fetch(`http://tecmediateam.us-east-1.elasticbeanstalk.com/api/v1/publicacion/email/${username}`);
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
            fetchPublicaciones();
        }
    }, [username]);

    const handleDeleteConfirmation = (publicacionid) => {
        setConfirmDelete(publicacionid);
    };

    const handleDeleteCancel = () => {
        setConfirmDelete(null);
    };

    const handleDeleteConfirm = (publicacionid) => {
        fetch(`http://tecmediateam.us-east-1.elasticbeanstalk.com/api/v1/publicacion/eliminar/${publicacionid}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
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
    const publicacionInvertida = [...publicaciones].reverse();

    return (
        <div className="publicaciones_contenido">
            <div className="tituloPub">
                <h6>Mis Publicaciones</h6>
            </div>
            {publicaciones.length ? (
                <ul>
                    {publicacionInvertida.map((publicacion) => (
                        <div key={publicacion.id} className="lista_pub text-center">
                            <div className="titulo_publicacion">
                                <h5>
                                    <span>Categoria:</span> <span className="titulo_p">{publicacion.categoria}</span>
                                </h5>
                            </div>
                            <div className="contenido_publicacion">
                                <div className="text-center">
                                    <h5>{publicacion.titulo}</h5>
                                </div>
                                <p className="card-text">{publicacion.contenido}</p>
                                <a target="_blank" href={publicacion.url}>
                                    {publicacion.url}
                                </a>
                            </div>
                            <div className="card-footer text-body-secondary">
                                <div className="date">
                                    <a className='link'><h6>{publicacion.email}</h6></a>
                                    <h6>{format(new Date(publicacion.fecha_pub), 'dd/MM/yyyy HH:mm')}</h6>
                                </div>
                            </div>
                            <hr />
                            <div className="links btn-group" role="group" aria-label="Basic example">
                                {confirmDelete === publicacion.publicacionid ? (
                                    <>
                                        <button className="button_confirmar" type="button" onClick={() => handleDeleteConfirm(publicacion.publicacionid)}>
                                            Confirmar
                                        </button>
                                        <button className="button_cancelar" type="button" onClick={handleDeleteCancel}>
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btnmp button_eliminar" type="button" onClick={() => handleDeleteConfirmation(publicacion.publicacionid)}>
                                            <img
                                                className="imgevent"
                                                src="https://cdn-icons-png.flaticon.com/128/2603/2603105.png"
                                                alt="Añadir a favoritos"
                                            />
                                        </button>
                                        <button className="btnmp button_editar" type="button">
                                            <Link to={`/editarpublicacion/${publicacion.publicacionid}`}>
                                                <img
                                                    className="imgevent"
                                                    src="https://cdn-icons-png.flaticon.com/128/2921/2921222.png"
                                                    alt="Añadir a favoritos"
                                                />
                                            </Link>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No has hecho ninguna publicación.</p>
            )}
        </div>
    );
};

export default MisPublicaciones;
