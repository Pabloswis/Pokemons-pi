import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/landingPage"
import Home from "./components/Home"
//import { BrouserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
   
      <div className="App">
        <h1>Henry Pokemon</h1>
        <switch>
        <Route exact path="/">
            <LandingPage/>  
        </Route>
        
        <Route exact path="/home">
            <Home/>  
        </Route>

        </switch>
      </div>
    
  );
}

export default App;
