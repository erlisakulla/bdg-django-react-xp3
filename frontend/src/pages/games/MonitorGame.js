import React, { Component } from 'react';
import '../../css/Main.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Nav } from 'react-bootstrap';
import axiosInstance from '../../axios'
import MonitorGamesList from '../components/MonitorGamesList'

/**
 * Monitor Games page 
 *
 * @component
 */
class MonitorGames extends Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this);
    
    this.state = {
      is_instructor: '',
      games: '',
      roles: '',
      message: 'No games to display',
    }
  }

  /**
   * Method to get games to display
   *
   * @method
   */
  componentDidMount() {
    axiosInstance.get('http://127.0.0.1:8000/api/user/')
    .then((res) => {
      const isInst = res.data.is_instructor;
      this.setState({is_instructor: isInst});
      console.log(res.data);

      // If user is student, get games that they have joined
      if (this.state.is_instructor === false) {
        axiosInstance.get('http://127.0.0.1:8000/api/role/')
        .then((res) => {
          const allRoles = res.data;
          this.setState({roles: allRoles});
          // console.log(res.data);

          // getting games based on roles
          var i, gameid;
          for (i = 0; i < allRoles.length; i++) {
            gameid = allRoles[i].associatedGame;
            axiosInstance.get(`http://127.0.0.1:8000/api/game/${gameid}`)
            .then((res) => {
              const game = res.data;
              this.setState(previousState => ({games: [...previousState.games, game]}));
              // console.log(res.data);
            })
            .catch(error => {if(error.response){console.log(error.response.data);}});
          }
        }).catch(error => {if(error.response){console.log(error.response.data);}});
      }
      // if user is instructor, get games they have created
      else if (this.state.is_instructor === true) {
        axiosInstance.get('http://127.0.0.1:8000/api/game/')
        .then((res) => {
          const allGames = res.data;
          this.setState({games: allGames});
          console.log(res.data);
        })
        .catch(error => {if(error.response){console.log(error.response.data);}});
      }
    })
    .catch(error => {if(error.response){console.log(error.response.data);}});
  }

  render() {
    return (
      <> 
        <Navbar/>

        <div className="main-container">
        <h2>Monitor Games</h2>
          <p>Here you can monitor all the games you have created.</p>
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
                    <Nav.Link href="/join">Join Games</Nav.Link>
                  </Nav.Item> : null
                }
                <Nav.Item>
                <Nav.Link href="/monitor" className="active">Monitor Games</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body>
              {/* ------- Table with created/joined games to monitor ------- */}
              <MonitorGamesList games={this.state.games} message={this.state.message}/>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default MonitorGames;