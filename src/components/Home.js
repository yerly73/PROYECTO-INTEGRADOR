import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Publicacion from "./Publicacion";
import NewPublicacion from "./NewPublicacion";
import Footer from "./Footer";
import Appheader from "./Appheader";
import Perfil from "./Perfil";
import Evento from "./Evento";

const Home = () => {
    useEffect(() => {
    }, []);

    return (
        <div class="container-app">
            <div class="header"><Appheader/></div>
            <div class="left"><Perfil/></div>
            <div class="main">
                <NewPublicacion/>
                <Publicacion/></div>
            <div class="right">
                <Evento/>
            </div>
            <div class="footer">footer</div>
        </div>
    );
}

export default Home;