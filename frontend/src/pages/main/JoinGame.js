import React, { Component } from 'react';
import '../../css/Main.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Nav } from 'react-bootstrap';
import GameRegisterForm from '../components/forms/GameRegisterForm';
import RegisteredGamesList from '../components/lists/RegisteredGamesList';
import axiosInstance from '../../axios';

/**
 * Join Games page 
 *
 * @component
 */
class JoinGames extends Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this);
    
    /**
     * Games display states
     */
    this.state = {
      roles: null,
      message: 'No games to display',
      is_instructor: '',
    }
  }

  /**
   * Method to get all games
   *
   * @method
   */
   componentDidMount() {
    axiosInstance.get('http://127.0.0.1:8000/api/role/').then((res) => {
      const allRoles = res.data;
      this.setState({roles: allRoles});
      console.log(res.data);
    })
    .catch(error => {if(error.response){console.log(error.response.data);}});

    axiosInstance.get('http://127.0.0.1:8000/api/user/')
    .then((res) => {
      const isInst = res.data.is_instructor;
      this.setState({is_instructor: isInst});
      console.log(res.data);
    })
    .catch(error => {if(error.response){console.log(error.response.data);}});
  }

  render() {
    return (
      <> 
        <Navbar/>

        <div className="main-container">
          <h2>Join Games</h2>
          <p>Here you can register to games, view and join all games you have registered for.</p>
          <hr/>

          <Card>
            <Card.Header>
              <Nav variant="tabs">
                { this.state.is_instructor === true ?
                  <Nav.Item>
                    <Nav.Link href="/create">Setup Games</Nav.Link>
                  </Nav.Item> : null
                }
                { this.state.is_instructor === false ?
                  <Nav.Item>
                    <Nav.Link href="/join" className="active">Join Games</Nav.Link>
                  </Nav.Item> : null
                }
                <Nav.Item>
                  <Nav.Link href="/monitor">Monitor Games</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body>
              { this.state.is_instructor === false ?
                <>
                  {/* Form for registering for a game */}
                  <GameRegisterForm/>
                  {/* ------- Table with games to join ------- */}
                  <RegisteredGamesList roles={this.state.roles} message={this.state.message}/>
                </> : 
                <h5 style={{textAlign:'center', fontWeight:'400', color:'grey'}}>Only students can join games</h5>
              }
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default JoinGames;