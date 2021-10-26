// import logo from "./assets/logo.png";
import NavBar from "./components/NavBar";
import "./App.css";
// import { Nav } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { Footer } from "./components/index";
// ?
function App() {
  return (
    <div className="App">
      <NavBar />

        <Switch>
            {/* Contact Page */}
            <Route path="/contact/:id">
                
            </Route>

            <Route path="/contact">
            <Contact />
            </Route>

            {/* Main Page */}
            <Route path="/">
            <Home />
            </Route>
        </Switch>

      <Footer />
    </div>
  );
}

export default App;
