import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/Home";
import CreatePokemon from './components/CreatePokemon'

function App() {
  return (
    <div className="App">
      
      <switch>
        
        <Route exact path='/' component={LandingPage}/>        

        <Route exact path='/created' component={CreatePokemon}/>
        <Route exact path='/home' component={Home}/>
      </switch>
    </div>
  );
}

export default App;
