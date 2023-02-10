import "./App.css";
import { Route  } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/Home";
import CreatePokemon from './components/CreatePokemon'
import Detail from "./components/Detail";
import PutPokemon from "./components/PutPokemon";

function App() {
  return (
    <div className="App">
      <switch>        
        <Route exact path='/' component={LandingPage}/>        
        <Route exact path='/home' component={Home}/>
        <Route exact path='/created' component={CreatePokemon}/>
        <Route exact path='/pokemon/:idPokemon' component={Detail} />
        <Route exact path='/put' component={PutPokemon} />
      </switch>
    </div>
  );
}

export default App;
