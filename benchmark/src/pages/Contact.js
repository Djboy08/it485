import { Button,Dropdown,InputGroup,FormControl } from 'react-bootstrap';


function Contact(props) {
  return (
      <div>
          <div>
              <p className="font-weight-bold">Contact us &#60;3</p>
          </div>

          <div style={{
              fontFamily: "Spanish",
              fontSize: "55px"
          }}>
            <div
        class="container"
        style={{
          backgroundColor: "#31353c",
          borderRadius: "10px",
          border: "1px solid #31353c",
          padding: "20px",
          marginTop: "20px",
        }}>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
 
          
    
          </Dropdown.Toggle>

          <InputGroup>
          <FormControl placeholder="Enter Gpu Name" aria-label="This should look up and display a gpu"/>
          <Button variant="outline-secondary">Search Item</Button>
          </InputGroup>

          <Dropdown.Menu>
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        </div>
        </div>
          
      </div>
  );
}

export default Contact;
