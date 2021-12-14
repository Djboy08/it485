// import logo from "./assets/logo.png";
import NavBar from "./components/NavBar";
import "./App.css";
// import { Nav } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Games from "./pages/Games";
import Builder from "./pages/Builder";
import { Footer } from "./components/index";
// ?
function App() {
  return (
    <div className="App">
      <NavBar />

      <Switch>
        {/* Contact Page */}
        {/* <Route path="/contact/:id">
                
            </Route> */}

        <Route path="/contact" component={Contact}/>

        {/* Games Page */}
        <Route path="/games" component={Games}/>

        {/* Build Page */}
        <Route path="/build/:guid?" component={Builder}/>

        {/* Main Page */}
        <Route path="/" component={Home}/>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
