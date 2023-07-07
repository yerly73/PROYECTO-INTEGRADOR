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
                            <div class="text-center pt-2">
                                <div class="titulo_publicacion">
                                    <h5 key={item.titulo}>Categoria: {item.titulo}</h5>
                                </div>
                                <div class="contenido_publicacion">
                                    <p class="card-text" key={item.contenido}>
                                        {item.contenido}
                                    </p>
                                </div>
                                <div class="card-footer text-body-secondary">
                                    <div class="date">
                                        <h6 key={item.fecha_pub}>{item.fecha_pub}</h6>
                                    </div>
                                </div>
                            </div>
                        );

                    })}
                </ul>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    )
}

export default Publicacion;