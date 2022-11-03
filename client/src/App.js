import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      
      <switch>
        
        <Route exact path='/' component={LandingPage}/>        

        <Route exact path='/home' component={Home}/>
      </switch>
    </div>
  );
}

export default App;
