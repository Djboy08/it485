import { Button,Dropdown,InputGroup,FormControl } from 'react-bootstrap';
import { HomeCard } from "../components";
import logo from "../assets/Who_We_aRe.jpg";

function Contact(props) {
  return (
    <div
    class="container"
    style={{
      backgroundColor: "#31353c",
      borderRadius: "10px",
      border: "1px solid #31353c",
      padding: "20px",
      marginTop: "20px",
    }}
  >

    {/* <img src={logo} className="App-logo py-5 my-2" alt="logo" />
    <hr class="solid" style={{
        color: "white",
        marginTop: "20px",
        marginBottom: "20px",
    }} /> */}


    
    <h1 style={{color: "white"}}> Contact Us </h1>
    <div class="row justify-content-center">
      <HomeCard
        src={logo}
        cicle={true}
        title="Information"
        description="If there is a problem with the website or some features you would like to request, reach us here at Baenchpress@gmail.com"
      />
    </div>   
      </div>
  );
}

export default Contact;
