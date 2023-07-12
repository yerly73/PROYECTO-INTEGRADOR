import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
//import "react-toastify/dist/ReactToastify.css";

const Publicacion = () => {
    const username = sessionStorage.getItem("username");
    const navigate = useNavigate();

    const [publicacion, setPublicacion] = useState([]);
    const [categoria, setCategoria] = useState("");

    const opcionesCategoria = [
        { value: "Recursos académicos", label: "Recursos académicos" },
        { value: "Orientación vocacional y profesional", label: "Orientación vocacional y profesional" },
        { value: "Experiencias estudiantiles", label: "Experiencias estudiantiles" },
        { value: "Desarrollo personal", label: "Desarrollo personal" },
        { value: "Recomendaciones", label: "Recomendaciones" },
        { value: "Consejos de estudio", label: "Consejos de estudio" },
        { value: "Proyectos y trabajos destacados", label: "Proyectos y trabajos destacados" },
        { value: "Apoyo y consejos para exámenes", label: "Apoyo y consejos para exámenes" },
        { value: "Idiomas y estudios internacionales", label: "Idiomas y estudios internacionales" },
        // Agrega más opciones de categoría según tus necesidades
        //hola
    ];

    const fetchData = async () => {
        try {
            const response = await fetch('http://tecmedia-g5b.us-east-1.elasticbeanstalk.com/api/v1/publicacion');
            const jsonData = await response.json();
            setPublicacion(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const filtrarPublicaciones = async () => {
        try {
            const response = await fetch(`http://tecmedia-g5b.us-east-1.elasticbeanstalk.com/api/v1/publicacion/${categoria}`);
            const jsonData = await response.json();
            setPublicacion(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (categoria) {
            filtrarPublicaciones();
        } else {
            fetchData();
        }
    }, [categoria]);

    const handleSubmit = (e, item) => {
        e.preventDefault();
        const { categoria, titulo, contenido, url, email } = item;
        const regobj = { categoria, titulo, contenido, url, email, username };
        fetch("http://tecmediateam.us-east-1.elasticbeanstalk.com/api/v1/publicacionfavorito/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(regobj),
        })
            .then((res) => {
                if (res.ok) {
                    toast('Añadido a favoritos!', {
                        icon: '😍',
                      });
                    navigate('/');
                } else {
                    throw new Error("Error al publicar la publicación");
                }
            })
            .catch((err) => {
                toast.error("Error: " + err.message);
            });
    };
    const publicacionInvertida = [...publicacion].reverse();

    return (
        <div className="publicaciones_contenido">
            <div className="tituloPub">
                <h6>Publicaciones</h6>
            </div>
            <div>
                <h6 className="text-start">Selecciona una categoria para ver los contenidos relacions a:</h6>
                <select className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value="">Ver todas las publicaciones</option>
                    {opcionesCategoria.map((opcion) => (
                        <option key={opcion.value} value={opcion.value}>
                            {opcion.label}
                        </option>
                    ))}
                </select>
            </div>
            {publicacion.length ? (
                <ul>
                    {publicacionInvertida.map((item) => (
                        <div key={item.id} className="lista_pub text-center">
                            <form onSubmit={(e) => handleSubmit(e, item)}>
                                <div className="titulo_publicacion">
                                    <h5>
                                        <span>Categoria:</span>{" "}
                                        <span className="titulo_p">{item.categoria}</span>
                                    </h5>
                                    <input hidden value={item.categoria} className="form-control" />
                                </div>
                                <div className="contenido_publicacion">
                                    <div className="text-center">
                                        <h5>{item.titulo}</h5>
                                    </div>
                                    <input
                                        hidden
                                        required
                                        value={item.titulo}
                                        className="form-control"
                                    />

                                    <p className="card-text">{item.contenido}</p>
                                    <textarea
                                        hidden
                                        required
                                        value={item.contenido}
                                        className="form-control"
                                    />

                                    <a target="_blank" href={item.url}>
                                        {item.url}
                                    </a>
                                    <input hidden value={item.url} className="form-control" />
                                </div>
                                <div className="card-footer text-body-secondary">
                                    <div className="date">
                                        <a className="link"><h6>{item.email}</h6></a>
                                        <h6>{format(new Date(item.fecha_pub), 'dd/MM/yyyy HH:mm')}</h6>

                                        <input
                                            hidden
                                            required
                                            value={item.email}
                                            className="form-control"
                                        />
                                        <input hidden required value={username} className="form-control" />
                                    </div>
                                </div>
                                <hr />
                                <div className="links btn-group" role="group" aria-label="Basic example">
                                    <button className="button_pf" type="submit">
                                        <img
                                            className="imgevent"
                                            src="https://cdn-icons-png.flaticon.com/128/10238/10238080.png"
                                            alt="Añadir a favoritos"
                                        />
                                    </button>
                                </div>
                            </form>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No hay publicaciones disponibles.</p>
            )}
        </div>
    );
};

export default Publicacion;
