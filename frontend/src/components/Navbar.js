import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, OverlayTrigger, Tooltip} from 'react-bootstrap';
import SettingsIcon from '@material-ui/icons/Settings';

// Main Navigation bar component
class customNavbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      logged_in: localStorage.getItem('access_token') ? true : false,
    }
  }
  
  // Need to implement proper logout
  logout = () => {
    localStorage.removeItem('access_token');
    this.setState({logged_in: false});
    console.log(this.state.logged_in);
    window.location = "/";
  };

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="customNav">
        <Navbar.Brand>Beer Distribution Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link onClick={this.logout}>Logout</Nav.Link>
            <Nav.Link href="#"><Settings/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default customNavbar;

// Account Settings component 
class Settings extends React.Component {
  render() {
    return(
      <OverlayTrigger
        key="bottom"
        placement="bottom"
        overlay={
          <Tooltip id="tooltip-bottom">
            Account Settings
          </Tooltip>
        }>
        <SettingsIcon/>
      </OverlayTrigger>
    );
  }
}