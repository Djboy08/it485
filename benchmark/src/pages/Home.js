import { Button } from "react-bootstrap";
import { HomeCard } from "../components";
import logo from "../assets/logo.png";
import firstCardLogo from "../assets/cardImg1.jpg";
import secondCardLogo from "../assets/Who_We_aRe.jpg";
import thirdCardlogo from "../assets/Why_WE_Do_it.png";

function Home(props) {
  return (
    <>
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


        
        <h1 style={{color: "white"}}> Get started </h1>
        <Button variant="dark" size="lg">Press Me!</Button>
        <div class="row justify-content-center">
          <HomeCard
            src={firstCardLogo}
            title="What Is This"
            description="BÆnch Press is a website meant to make PC creation and Upgrading a whole lot more easier. With the use of our database, feel free to plan your next step in the PC world."
          />
          <HomeCard
            src={secondCardLogo}
            title="Who Are We"
            description="A couple of college kids trying to make a useful tool for all to use. We all are very passionate about IT and hope we can help you out today."
          />
          <HomeCard
            src={thirdCardlogo}
            title="Why We Do This"
            description="There are a lot of good tools for PC building out there, but we never felt there was one solid one someone with no PC knowlege can use. We want to make you a tool that can help even the clueless can use!"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
