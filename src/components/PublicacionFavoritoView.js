import { useEffect } from "react";
import PublicacionFavoritos from "./PublicacionesFavoritos";
import Appheader from "./Appheader";
import Perfil from "./Perfil";
import Evento from "./Evento";

const PublicacionFavoritoView = () => {
    useEffect(() => {
    }, []);

    return (
        <div class="container-app">
            <div class="header"><Appheader/></div>
            <div class="left"><Perfil/></div>
            <div class="main">
                <PublicacionFavoritos/></div>
            <div class="right">
                <Evento/>
            </div>
            <div class="footer">footer</div>
        </div>
    );
}

export default PublicacionFavoritoView;