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
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// ?
function App() {

  return (
    <div className="App">
      <NavBar />

      <Switch>
        {/* Contact Page */}
        {/* <Route path="/contact/:id">
                
            </Route> */}
        <Route path="/builder/:guid" component={Builder}/>
        <Route path="/builder" component={Builder}/>
        <Route path="/g/b">
            /g/b
        </Route>
        <Route path="/g">
            /g
        </Route>

        <Route path="/contact" component={Contact}/>

        {/* Games Page */}
        <Route path="/games" component={Games}/>

        

        {/* Main Page */}
        <Route path="/" component={Home}/>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
