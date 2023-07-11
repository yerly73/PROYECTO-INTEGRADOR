import { useEffect, useState } from "react";
import Appheader from "./Appheader";
import Perfil from "./Perfil";
import Evento from "./Evento";
import Editarperfil from "./Editarperfil";
import { Link } from "react-router-dom";

const EditarPerfilView = () => {
    useEffect(() => {
    }, []);

    return (
        <div class="container-app">
            <div class="header"><Appheader/></div>
            <div class="left"><Perfil/></div>
            <div class="main">
                <Editarperfil/>
            </div>
            <div class="right">
                <Evento/>
            </div>
        </div>
    );
}

export default EditarPerfilView;