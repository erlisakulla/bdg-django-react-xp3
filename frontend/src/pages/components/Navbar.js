import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, OverlayTrigger, Tooltip} from 'react-bootstrap';
import SettingsIcon from '@material-ui/icons/Settings';
import axiosInstance from '../../axios'

/**
 * Navbar component
 *
 * @component
 */
class CustomNavbar extends React.Component {
  constructor(props) {
    super(props)

    /**
     * User state
     */
    this.state = {
      logged_in: localStorage.getItem('access_token') ? true : false,
    }
  }
  
  /**
   * Logout method
   *
   * @method
   */
  logout = () => {
    axiosInstance.post('http://127.0.0.1:8000/api/token/refresh', {refresh_token: localStorage.getItem('refresh_token')});

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
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
            <Nav.Link href="/settings"><Settings/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default CustomNavbar;

/**
 * Account Settings component
 *
 * @memberof customNavbar
 * @component
 */
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