import React, { useEffect, useState } from 'react';
//import { toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


const PublicacionFavoritos = () => {
  const [publicacion, setPublicaciones] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const navigate = useNavigate();
  const username = sessionStorage.getItem('username'); // Establece el valor del nombre de usuario que deseas filtrar


  useEffect(() => {
    const PublicacionFavoritos = async () => {
      try {
        const response = await fetch(`http://tecmedia-g5b.us-east-1.elasticbeanstalk.com/api/v1/publicacionfavorito/${username}`);
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
      PublicacionFavoritos();
    }
  }, [username]);

  const handleDeleteConfirmation = (publicacionid) => {
    setConfirmDelete(publicacionid);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  const handleDelete = (publicacionid) => {
    fetch(`http://tecmedia-g5b.us-east-1.elasticbeanstalk.com/api/v1/publicacionfavorito/eliminar/${publicacionid}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          toast('Eliminado de Favoritos!', {
            icon: '🥲',
          });
          window.location.reload()
        } else {
          throw new Error('Error al eliminar la publicación');
        }
      })
      .catch((err) => {
        toast.error('Error: ' + err.message);
      });
  };
  const publicacionInvertida = [...publicacion].reverse();

  return (
    <div className="publicaciones_contenido">
      <div className="tituloPub">
        <h6>Publicaciones Favoritos</h6>
      </div>
      {publicacion.length ? (
        <ul>
          {publicacionInvertida.map((item) => (
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
                  <a className='link'><h6>{item.email}</h6></a>
                  <h6>{format(new Date(item.fecha_pub), 'dd/MM/yyyy HH:mm')}</h6>

                </div>
              </div>

              <hr />
              <div className="links btn-group" role="group" aria-label="Basic example">
                {confirmDelete === item.publicacionid ? (
                  <>
                    <button className="button_confirmar" type="button" onClick={() => handleDelete(item.publicacionid)}>
                      Confirmar
                    </button>
                    <button className="button_cancelar" type="button" onClick={handleDeleteCancel}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button className="button_eliminar" type="button" onClick={() => handleDeleteConfirmation(item.publicacionid)}>
                      <img
                        className="imgevent"
                        src="https://cdn-icons-png.flaticon.com/128/2603/2603105.png"
                        alt="Añadir a favoritos"
                      />
                    </button>
                    <button className="button_editar" type="button">
                      <img
                        className="imgevent"
                        src="https://cdn-icons-png.flaticon.com/128/10238/10238080.png"
                        alt="Añadir a favoritos"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>No hay publicaciones favoritas.</p>
      )}
    </div>
  );
};

export default PublicacionFavoritos;
