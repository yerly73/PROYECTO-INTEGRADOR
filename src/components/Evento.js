import { useEffect, useState } from "react";

const Evento = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://tecmediateam.us-east-1.elasticbeanstalk.com/api/v1/evento")
      .then((response) => response.json())
      .then((data) => setEventos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div class="card_evento">
        <p class="cookieHeading">Nota Importante!</p>
        <p class="cookieDescription">Apreciamos tu interés en promocionar tu evento a través de Tecmedia. Te invitamos a ponerte en contacto con nuestro equipo para obtener más información sobre cómo publicar tu evento en nuestra plataforma.</p>
        <a className="link"><h6>TecMediaSoporte@tecmedia.com</h6></a>
        <div class="buttonContainer">
          <img className="red_social" src="https://cdn-icons-png.flaticon.com/128/725/725339.png"/>
          <img className="red_social" src="https://cdn-icons-png.flaticon.com/128/1383/1383336.png"/>
          <img className="red_social" src="https://cdn-icons-png.flaticon.com/128/725/725350.png"/>
        </div>
      </div>
      {eventos.map((evento) => (
        <div className="card">
          <img src={evento.url_img} />
          <div className="container">
            <h4>{evento.titulo}
            </h4>
            <h6>Fecha: {evento.fecha_eve}</h6>
          </div>
          <div className="social">
            <a href={evento.url_info} target="_blank" rel="noopener noreferrer">
              <img
                className="imgevent link"
                src="https://cdn-icons-png.flaticon.com/128/2596/2596200.png"
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
