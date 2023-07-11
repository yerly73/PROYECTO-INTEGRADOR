import { useEffect } from "react";
import MisPublicaciones from "./MisPublicaciones";
import Appheader from "./Appheader";
import Perfil from "./Perfil";
import Evento from "./Evento";

const MisPublicacionesView = () => {
    useEffect(() => {
    }, []);

    return (
        <div class="container-app">
            <div class="header"><Appheader/></div>
            <div class="left"><Perfil/></div>
            <div class="main">
                <MisPublicaciones/></div>
            <div class="right">
                <Evento/>
            </div>
            <div class="footer">footer</div>
        </div>
    );
}

export default MisPublicacionesView;