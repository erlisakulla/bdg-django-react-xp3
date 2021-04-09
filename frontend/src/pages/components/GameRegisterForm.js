import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axiosInstance from '../../axios'

/**
 * Form component for registering to a game
 *
 * @component
 */
class GameRegisterForm extends React.Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onSelectGame = this.onSelectGame.bind(this);
    this.onSelectRole = this.onSelectRole.bind(this);
    this.registerToGame = this.registerToGame.bind(this);
    
    /**
     * Role data (/api/role)
     */
    this.state = {
      errors: '',
      games: '',
      selected_game: '',
      roles: '',
      selected_role: '',

      role_register: {
        playedBy: 2,
      }
    }
  }

  /**
   * Method to get all games
   *
   * @method
   */
  componentDidMount() {
    axiosInstance.get('http://127.0.0.1:8000/api/game/all')
    .then((res) => {
      // const allGames = res.data;
      // this.setState({games: allGames});
      var i;
      for (i = 0; i < res.data.length; i++) {
        const gid = res.data[i].id;

        axiosInstance.get(`http://127.0.0.1:8000/api/game/${gid}/getroles`)
        .then((res) => {          
          if (res.data.length > 0) {
            // displaying only games that have possible roles to chose from 
            axiosInstance.get(`http://127.0.0.1:8000/api/game/${gid}/`)
            .then((res) => {
              const game = res.data;
              this.setState(previousState => ({games: [...previousState.games, game]}));
            }) 
          }
          // console.log(res.data);
        })
        .catch(error => {
          if(error.response) {
            console.log(error.response.data);
          }
        });
      }

      
      // this.setState(previousState => ({games: [...previousState.games, game]}));
      // console.log(res.data);
    })
    .catch(error => {
      if(error.response){
        console.log(error.response.data);
      }
    });
  }

  /**
   * Method to get all roles of selected game
   *
   * @method
   * @param {Object} e event handler
   */
  onSelectGame(e) {
    this.setState({errors: null});

    const sel = this.state;
    sel.selected_game = e.target.value;
    console.log(this.state.selected_game);
    
    const gameid = this.state.selected_game;
    axiosInstance.get(`http://127.0.0.1:8000/api/game/${gameid}/getroles`)
    .then((res) => {
      const allRoles = res.data;
      this.setState({roles: allRoles});
      // console.log(res.data);
    })
    .catch(error => {
      if(error.response) {
        console.log(error.response.data);
      }
    });
  }

   /**
   * Method to get selected role
   *
   * @method
   * @param {Object} e event handler
   */
    onSelectRole(e) {
      this.setState({errors: null});
  
      const sel = this.state;
      sel.selected_role = e.target.value;
      console.log(this.state.selected_role);
    }
  
  registerToGame(e) {
    e.preventDefault();
    
    let errorMessage = this.state.errors;
    /**
     * createdGame instances
     */
    const registerToGame = this.state.role_register;
    const roleid = this.state.selected_role;
    /**
     * Axios post request
     */
    axiosInstance.patch(`http://127.0.0.1:8000/api/role/${roleid}/register/`, registerToGame, {crossDomain: true})
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("Registered successfully");
        // redirecting upon successful registration
        window.location = "/join";
      } 
      else {
        console.log(res.data);
      }
    })
    .catch(error => {if(error.response){ 
      errorMessage = "Couldn't register to game. Don't register for the same game. Please try again.";
      this.setState({errors: errorMessage});
      console.log(error.response.data);
    }});
  }

  render(){
    return(
      <div className="main-container-register">
        <Form style={{textAlign:'center'}} onSubmit={this.registerToGame}>
          {/* ------- Game Selector ------- */}
          <Form.Label>Game</Form.Label>
          <Form.Control 
            as="select" 
            id="role_selector" 
            custom 
            defaultValue="def" 
            onChange={this.onSelectGame}>
              <option value="def" disabled>Choose game..</option>
              <GamesList games={this.state.games}/>
          </Form.Control>
          {/* ------- Role Selector ------- */}
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control 
              as="select" 
              id="role_selector" 
              custom 
              defaultValue="def" 
              onChange={this.onSelectRole}>
                <option value="def" disabled>Choose role..</option>
                <RolesList roles={this.state.roles}/>
            </Form.Control>
          </Form.Group>

          <div style={{color:'red', paddingBottom:'10px'}}>{this.state.errors}</div>

          <Button variant="primary" type="submit">
            <ExitToAppIcon/> Register to Game
          </Button>
        </Form> 
      </div>
    );
  }
}

export default GameRegisterForm;

/**
 * Component to display all games in select
 *
 * @component
 */
const GamesList = (props) => {
	const { games } = props;

	if (!games || games.length === 0) {
		return ( 
			<option value="none" disabled>No games to display</option>
		);
	}

	return (
    <>
      {games.map((game) => {
        return(
          <option key={game.id} value={game.id}>Game {game.id}</option>
        );
      })}
    </>
	)
}

/**
 * Component to display all roles of selected game
 *
 * @component
 */
const RolesList = (props) => {
	const { roles } = props;

	if (!roles || roles.length === 0) {
		return ( 
			<option value="none" disabled>No roles to display</option>
		);
	}
  
  return (
    <>
      {roles.map((role) => {
        return(
          <option key={role.id} value={role.id}>{role.roleName}</option>
        );
      })}
    </>
	)
}