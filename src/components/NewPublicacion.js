import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';

const NewPublicacion = () => {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [contenido, setContenido] = useState("");
  const [url, setUrl] = useState("");
  const email = sessionStorage.getItem("username");

  const navigate = useNavigate();

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
  ];

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Por favor ingresa los datos en ';
    if (titulo === null || titulo === '') {
      isproceed = false;
      errormessage += ' titulo';
    }
    if (contenido === null || contenido === '') {
      isproceed = false;
      errormessage += ' contenido';
    }
    if (url === null || url === '') {
      isproceed = false;
      errormessage += ' url';
    }
    return isproceed;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (IsValidate()) {
      const contenidoConSaltosDeLinea = contenido.replace(/\n/g, '\\n');
      const regobj = { categoria, titulo, contenido: contenidoConSaltosDeLinea, url, email };

      fetch("http://tecmediateam.us-east-1.elasticbeanstalk.com/api/v1/publicacion/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regobj)
      })
        .then((res) => {
          if (res.ok) {
            toast('Contenido Publicado!', {
              icon: '😉',
            });
            navigate('/');
            window.location.reload()
          } else {
            throw new Error('Error al publicar');
          }
        })
        .catch((err) => {
          toast.error('Error: ' + err.message);
        });
    }
  };


  return (
    <div className="newpub">
      <form className="formularioPublicacion" onSubmit={handleSubmit}>
        <div className="publicacion text-center pt-3"><h5>Publicar nuevo contenido:</h5><hr></hr></div>
        <div>
          <select className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Seleccione una categoría</option>
            {opcionesCategoria.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div><br />
        <input required value={titulo} onChange={(e) => setTitulo(e.target.value)} className="form-control" placeholder="Titulo"></input><br></br>
        <textarea
          required
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="form-control"
          placeholder="¿Qué es?"
        ></textarea><br></br>        <input required value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" placeholder="Link"></input><br></br>
        <input required value={email} hidden className="form-control" placeholder="Username"></input><br></br>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btnsubmit btn-primary me-md-2" type="submit">Publicar</button>
        </div><br></br>
      </form>
    </div>
  );
}

export default NewPublicacion;
