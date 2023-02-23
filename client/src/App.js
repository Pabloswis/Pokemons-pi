import "./App.css";
import { Route  } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/Home";
import CreatePokemon from './components/CreatePokemon'
import Detail from "./components/Detail";
import DeletePokemon from "./components/DeletePokemon";
import PutPokemon from "./components/PutPokemon";

import axios from 'axios'
axios.defaults.baseURL = 'https://pokemons-pi-production-3d4a.up.railway.app/'

function App() {
  return (
    <div className="App">
      <switch>        
        <Route exact path='/' component={LandingPage}/>        
        <Route exact path='/home' component={Home}/>
        <Route exact path='/created' component={CreatePokemon}/>
        <Route exact path='/pokemon/:idPokemon' component={Detail} />
        <Route exact path='/delete' component={DeletePokemon} />
        <Route exact path='/put' component={PutPokemon} />
        {/* <Route exact path='/put/modificar' component={'formularioModificar'} /> */}
        
      </switch>
    </div>
  );
}

export default App;
