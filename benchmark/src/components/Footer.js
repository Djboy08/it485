// import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import logo from "../assets/logo.png";
function Footer(props) {
  return (
    <>
      <footer class="bg-dark d-flex flex-wrap justify-content-between align-items-center py-3">
        <p class="col-md-4 mb-0 text-muted">© 2021 Benchmark</p>

        <a class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <img class="bi me-2" width="40" height="32" src={logo}></img>
        </a>
      </footer>
    </>
  );
}

export default Footer;
