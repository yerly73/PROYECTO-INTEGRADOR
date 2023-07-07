import { useEffect } from "react";

const Evento = () => {
    useEffect(() => {
    }, []);

    return (
       <div>
         <div class="card">
            <img src="https://www.tecsup.edu.pe/sites/default/files/event/image/PMBOK-2.jpg"/>
            <div class="container">
                <h4><b>MASTER CLASS</b></h4>
                <p>!Ingreso Gratis¡</p>
            </div>
            <div class="social">
                <a href="https://www.tecsup.edu.pe/eventos/master-class" target="blank"><img className="imgevent" src="https://cdn-icons-png.flaticon.com/128/2985/2985047.png"/></a>
            </div>
        </div>
        <div class="card">
            <img src="https://www.tecsup.edu.pe/sites/default/files/event/image/SEMINARIO---CPE-POST-600x300.png"/>
            <div class="container">
                <h4><b>GEMELO DIGITAL</b></h4>
                <p>¡Ingreso Libre! Online</p>
            </div>
            <div class="social">
                <a href="https://www.tecsup.edu.pe/eventos/gemelo-digital" target="blank"><img className="imgevent" src="https://cdn-icons-png.flaticon.com/128/2985/2985047.png"/></a>
            </div>
        </div>
        <div class="card">
            <img src="https://www.tecsup.edu.pe/sites/default/files/event/image/Programaci%C3%B3n%20Android.png"/>
            <div class="container">
                <h4><b>PROGRAMACIÓN EN ANDROID</b></h4>
                <p>¡Webinar Gratuito!</p>
            </div>
            <div class="social">
                <a href="https://www.tecsup.edu.pe/eventos/programacion-en-android" target="blank"><img className="imgevent" src="https://cdn-icons-png.flaticon.com/128/2985/2985047.png"/></a>
            </div>
        </div>
        <div class="card">
            <img src="https://www.tecsup.edu.pe/sites/default/files/event/image/Logistica-Omnicanal-600x300.jpg"/>
            <div class="container">
                <h4><b>LOGÍSTICA OMNICANAL</b></h4>
                <p>Entrada Libre</p>
                <p>modalidad Online</p>
            </div>
            <div class="social">
                <a href="https://www.tecsup.edu.pe/eventos/logistica-omnicanal" target="blank"><img className="imgevent" src="https://cdn-icons-png.flaticon.com/128/2985/2985047.png"/></a>
            </div>
        </div>
        
       </div>
    );
}

export default Evento;