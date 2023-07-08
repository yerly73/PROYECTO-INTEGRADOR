import { useEffect, useState } from "react";

const Publicacion = () => {
    const [publicacion, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8095/api/v1/publicacion');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="publicaciones_contenido">
            <div className="tituloPub"><h6>Publicaciones</h6></div>
            {publicacion.length ? (
                <ul className="">
                    {publicacion.map((item) => {
                        // Renderiza el elemento
                        return (
                            <div class="lista_pub text-center">
                                <div class="titulo_publicacion">
                                    <h5 key={item.titulo}><span>Categoria:</span><span className="titulo_p"> {item.titulo}</span></h5>
                                </div>
                                <div class="contenido_publicacion">
                                    <p class="card-text" key={item.contenido}>
                                        {item.contenido}
                                    </p>
                                    <a target="_blank" href={item.url}>{item.url}</a>                                </div>
                                <div class="card-footer text-body-secondary">
                                    <div class="date">
                                        <h6 key={item.fecha_pub}>{item.fecha_pub}</h6>
                                    </div>
                                </div>
                                <hr />
                                <div class="links btn-group" role="group" aria-label="Basic example">
                                    <a>
                                        <img className="imgevent" src="https://cdn-icons-png.flaticon.com/128/3670/3670153.png" />
                                    </a>
                                    <a>
                                        <img className="imgevent" src="https://cdn-icons-png.flaticon.com/128/263/263417.png" />
                                    </a>
                                    <a>
                                    <img className="imgevent" src="https://cdn-icons-png.flaticon.com/128/6460/6460733.png" />
                                    </a>
                                </div>
                            </div>
                        );

                    })}
                </ul>
            ) : (
                <p>Publicaaciones...</p>
            )}
        </div>
    )
}

export default Publicacion;