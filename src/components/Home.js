import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Publicacion from "./Publicacion";
import NewPublicacion from "./NewPublicacion";
import Footer from "./Footer";

const Home = () => {
    useEffect(() => {
    }, []);

    return (
        <div class="text-center container pt-3">
            <div class="row">
                <div class="col">
                    <NewPublicacion/>
                </div>
                <div class="col">
                    <Publicacion/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default Home;