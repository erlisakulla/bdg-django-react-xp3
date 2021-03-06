import React from 'react';
import '../../../css/Main.css';
import GameUpdateForm from '../forms/GameUpdateForm';
import Option from '../Option';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form } from 'react-bootstrap';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axiosInstance from '../../../axios';
import PlayersList from './PlayersList';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

/**
 * Games List view 
 *
 * @component
 * @param {Object} games List of games to be displayed
 * @param {string} message Message shown if there are no games
 */
function GamesList(props) {
	const { games, message } = props;

	if (!games || games.length === 0) {
		return ( 
			<h5 style={{textAlign:'center', fontWeight:'400', color:'grey'}}>{message}</h5>
		);
	}

  /**
   * Method to delete game instance 
   *
   * @method
   * @param {Object} e event handler
   * @param {integer} id game id to be deleted
   */
	const deleteGame = (id, e) => {
    if (window.confirm("Are you sure you want to delete game " + id + "?")) {
      axiosInstance.delete(`http://127.0.0.1:8000/api/game/${id}`)
      .then(res => {
        // console.log(res.data);
        alert("Successfully deleted game")
        window.location = "/create";
      })
      .catch(error => {
        if(error.response){ 
          alert("Couldn't delete game. Please try again.");
          console.log(error.response.data);
        }
      });
    }
  }

  /**
   * Method to activate/deactivate game instance 
   *
   * @method
   * @param {Object} e event handler
   * @param {integer} id game id to be activated
   */
  const activateGame = (e, id) => {
    const toggle = document.getElementById(`custom-switch-${id}`);

    if (toggle.checked) {
      axiosInstance.post(`http://127.0.0.1:8000/api/game/${id}/toggleactive/`, {active: true})
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        if(error.response){ 
          console.log(error.response.data);
        }
      });
    }
    else {
      axiosInstance.post(`http://127.0.0.1:8000/api/game/${id}/toggleactive/`, {active: false})
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        if(error.response){ 
          console.log(error.response.data);
        }
      });
    }
  }

	/**
	 * Renders Yes or No depending on prop value
	 *
	 * @method
	 * @param {boolean} val value of boolean fields in games
	 */
	const YesOrNo = (props) => {
		if (props.val === true) {
			return <p style={{color:'green'}}><CheckIcon/></p>;
		}
		else {
			return <p style={{color:'red'}}><ClearIcon/></p>;
		}
	}

	/**
	 * Counter variable for row number
	 */
	let counter = 0;

	return (
		<Table responsive className="gamesList">
			<thead>
				<tr>
					<th>#</th>
					<th>Game ID</th>
					<th>Time Delay</th>
					{/* <th>Weekly Demand</th> */}
					<th>Has Wholesaler</th>
					<th>Has Distributor</th>
					<th>Holding Cost</th>
					<th>Backorder Cost</th>
					<th>Weeks Completed</th>
					<th>Week to stop</th>
					<th>Active</th>
					<th>Players</th>
					<th>Options</th>
				</tr>
			</thead>
			{/* This is only some dummy data, should implement get methods through backend */}
			<tbody>
				{games.map((game) => {
					counter++;
					return (
						<tr key={game.id}>
							<td>{counter}</td>
							<th>{game.id}</th>
							<td>{game.info_delay} weeks</td>
							<td><YesOrNo val={game.wholesalerPresent}/></td>
							<td><YesOrNo val={game.distributorPresent}/></td>
							<td>{game.holding_cost}</td>
							<td>{game.backlog_cost}</td>
							<td>{game.rounds_completed}/{game.session_length}</td>
							<td>{game.session_length}</td>
							<td>
                <Form.Check type="switch" id={`custom-switch-${game.id}`} defaultChecked={game.active} onChange={(e) => activateGame(e, game.id)}/>
              </td>
							<td><PlayersList gameid={`${game.id}`}/></td>
							<td>
								<Option 
                  name="Delete"
                  icon={<DeleteOutlineIcon 
                  id="deleteIcon" 
                  onClick={(e) => deleteGame(game.id, e)}/>} />
								<GameUpdateForm gameid={`${game.id}`}/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	)
}

export default GamesList;