import React from 'react';
import '../../css/Main.css';
import GameUpdateForm from '../components/GameUpdateForm';
import Option from '../components/Option';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayersPopover from './PlayersPopover';
import { Table } from 'react-bootstrap';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
	 * Renders Yes or No depending on prop value
	 *
	 * @method
	 * @param {boolean} val value of boolean fields in games
	 */
	const YesOrNo = (props) => {
		if (props.val === true) {
			return <p style={{color:'green'}}>Yes</p>;
		}
		else {
			return <p style={{color:'red'}}>No</p>;
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
							<td>{game.rounds_completed}</td>
							<td>{game.session_length}</td>
							<td><YesOrNo val={game.active}/></td>
							<td><PlayersPopover game={game.id}/></td>
							<td>
								<Option name="Pause" icon={<PauseCircleOutlineIcon id="pauseIcon"/>}/>
								<Option  name="Delete" icon={<DeleteOutlineIcon id="deleteIcon"/>}/>
								<GameUpdateForm game={game.id}/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	)
}

export default GamesList;