import { useEffect, useState } from "react";

const Evento = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8095/api/v1/evento")
      .then((response) => response.json())
      .then((data) => setEventos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {eventos.map((evento) => (
        <div className="card">
          <img src={evento.url_img}/>
          <div className="container">
            <h4>{evento.titulo}
            </h4>
            <h6>Fecha: {evento.fecha_eve}</h6>
          </div>
          <div className="social">
            <a href={evento.url_info} target="_blank" rel="noopener noreferrer">
              <img
                className="imgevent"
                src="https://cdn-icons-png.flaticon.com/128/2985/2985047.png"
                alt="Enlace al evento"
              />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Evento;
