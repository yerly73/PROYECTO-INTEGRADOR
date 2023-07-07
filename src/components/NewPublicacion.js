import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewPublicacion = () => {

    const [titulo, titulochange] = useState("");
    const [contenido, contenidochange] = useState("");

    const navigate = useNavigate();

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
        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { titulo, contenido };
        if (IsValidate()) {
            //console.log(regobj);
            fetch("http://localhost:8095/api/v1/publicacion/save", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Publicado :D')
                navigate('/');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }
    return (
        
        <div className="newpub">
                <form className="formularioPublicacion" onSubmit={handlesubmit}>
                    <div className="publicacion text-center pt-3"><h5>Publicar nuevo contenido:</h5><hr></hr></div>
                    <input required value={titulo} onChange={e => titulochange(e.target.value)} className="form-control" placeholder="¿Sobre que?"></input><br></br>
                    <textarea required value={contenido} onChange={e => contenidochange(e.target.value)} className="form-control" placeholder='¿Que estas pensando hoy?'></textarea><br></br>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btnsubmit btn-primary me-md-2" type="submit">Publicar</button>
                    </div><br></br>
                </form>
            </div>
    );
}

export default NewPublicacion;