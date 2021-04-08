import React from 'react';
import '../../css/Main.css';
import Navbar from '../components/Navbar';
import CreateGameForm from '../components/GameCreationForm';
import GamesList from '../components/GamesList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Nav } from 'react-bootstrap';
import axiosInstance from '../../axios'

/**
 * Dashboard page 
 *
 * @component
 */
class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this);
    
    /**
     * Games display states
     */
    this.state = {
      is_instructor: '',
      games: null,
      message: 'No games to display',
    }
  }

  /**
   * Method to get all games and user data
   *
   * @method
   */
  componentDidMount() {
    axiosInstance.get('http://127.0.0.1:8000/api/game/')
    .then((res) => {
      const allGames = res.data;
      this.setState({games: allGames});
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
          <h2>Created Games</h2>
          <p>Here you can view, edit and delete all the games you have created.</p>
          <hr/>

          <Card>
            <Card.Header>
              <Nav variant="tabs">
                { this.state.is_instructor === true ?
                  <Nav.Item>
                    <Nav.Link href="/create" className="active">Setup Games</Nav.Link>
                  </Nav.Item> : null
                }
                { this.state.is_instructor === false ?
                  <Nav.Item>
                    <Nav.Link href="/join">Join Games</Nav.Link>
                  </Nav.Item> : null
                }
                <Nav.Item>
                  <Nav.Link href="/monitor">Monitor Games</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            
            <Card.Body>
              { this.state.is_instructor === true ?
                <>
                  {/* Form for creating game */}
                  <CreateGameForm/>
                  {/* ------- Created Games Table ------- */}
                  <GamesList games={this.state.games} message={this.state.message}/>
                </> : 
                <h5 style={{textAlign:'center', fontWeight:'400', color:'grey'}}>Only instructors can create games</h5>
              }
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default Dashboard;