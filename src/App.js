import './components/assets/css/App.css';
//import "react-toastify/dist/ReactToastify.css";
//import { toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Perfil from './components/Perfil';
import PublicacionFavoritoView from './components/PublicacionFavoritoView';
import MisPublicacionesView from './components/MisPublicacionesView';
import EditarPerfilView from './components/EditarPerfilView';
import EditarPublicacionView from './components/EditarPublicacionView';


function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/perfil' element={<Perfil/>}></Route>
        <Route path='/editarperfil' element={<EditarPerfilView/>}></Route>
        <Route path='/publicacionesfavoritos' element={<PublicacionFavoritoView/>}></Route>
        <Route path='/mispublicaciones' element={<MisPublicacionesView/>}></Route>
        <Route path='/editarpublicacion/:publicacionid' element={<EditarPublicacionView/>}></Route>
       

      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}
export default App;
