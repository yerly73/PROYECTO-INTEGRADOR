import { useEffect, useState } from "react";
import Appheader from "./Appheader";
import Perfil from "./Perfil";
import Evento from "./Evento";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const EditarPublicacionView = () => {
    const { publicacionid } = useParams();

    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [contenido, setContenido] = useState('');
    const [url, setUrl] = useState('');
    const email = sessionStorage.getItem('username');

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

    useEffect(() => {
        const fetchPublicacion = async () => {
            try {
                const response = await fetch(`http://localhost:8095/api/v1/publicacion/id/${publicacionid}`);
                const data = await response.json();
                const { titulo, categoria, contenido, url } = data;
                setTitulo(titulo);
                setCategoria(categoria);
                setContenido(contenido);
                setUrl(url);
            } catch (error) {
                console.log('Error al obtener la publicación:', error);
            }
        };

        fetchPublicacion();
    }, [publicacionid]);

    const handleEditar = async (e) => {
        e.preventDefault();

        const datosActualizados = {
            categoria,
            titulo,
            contenido,
            url,
            email
        };

        try {
            const response = await fetch(`http://localhost:8095/api/v1/publicacion/actualizar/${publicacionid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosActualizados),
            });

            if (response.ok) {
                toast.success('Actualización correcta.');
            } else {
                toast.warning('Error al actualizar.');
            }
        } catch (error) {
            console.log('Error al enviar la solicitud de actualización:', error);
        }
    };

    return (
        <div className="container-app">
            <div className="header"><Appheader /></div>
            <div className="left"><Perfil /></div>
            <div className="main">
                <form className='text-start' onSubmit={handleEditar}>
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
                    Título:<br></br>
                    <input className='form-control' type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    <br></br>
                    Contenido:<br></br>
                    <textarea className='form-control' value={contenido} onChange={(e) => setContenido(e.target.value)} />
                    <br></br>
                    URL:<br></br>
                    <input className='form-control' type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                    <br></br>
                    <input hidden className='form-control' type="email" value={email} />
                    <br></br>
                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
            <div className="right">
                <Evento />
            </div>
        </div>
    );
    
}

export default EditarPublicacionView;