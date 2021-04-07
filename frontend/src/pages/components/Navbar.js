import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, OverlayTrigger, Tooltip} from 'react-bootstrap';
import SettingsIcon from '@material-ui/icons/Settings';
import axiosInstance from '../../axios';

/**
 * Navbar component
 *
 * @component
 */
class CustomNavbar extends React.Component {
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    /**
     * User state
     */
    this.state = {
      logged_in: localStorage.getItem('access_token') ? true : false,
      logged_user_name: '',
      is_instructor: '',
    }
  }
  
  /**
   * Logout method
   *
   * @method
   */
  logout() {
    // axiosInstance.post('http://127.0.0.1:8000/api/token/refresh', {refresh_token: localStorage.getItem('refresh_token')});
    // should post tokens to blacklist

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
    window.location = "/";
  };

  componentDidMount() {
    axiosInstance.get('http://127.0.0.1:8000/api/user/')
    .then((res) => {
      const user = res.data.name;
      const isInst = res.data.is_instructor;
      this.setState({logged_user_name: user});
      this.setState({is_instructor: isInst});
      console.log(res.data);
    })
    .catch(error => {if(error.response){console.log(error.response.data);}});
  } 
  
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="customNav">
        <Navbar.Brand style={{paddingRight:'10px'}}>Beer Distribution Game</Navbar.Brand>
        <Navbar.Text>Logged in as {this.state.logged_user_name}</Navbar.Text>
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