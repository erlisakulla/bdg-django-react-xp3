import React from 'react';
import '../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';

/**
 * Monitor Games List view 
 *
 * @component
 * @param {Object} games List of games to be displayed
 * @param {string} message Message shown if there are no games
 */
function MonitorGamesList(props) {
	const { games, message } = props;

	if (!games || games.length === 0) {
		return ( 
			<h5 style={{textAlign:'center', fontWeight:'400', color:'grey'}}>{message}</h5>
		);
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
          <th>Holding Cost</th>
          <th>Backorder Cost</th>
          <th>Current Week</th>
          <th>Factory Cost</th>
          <th>Distributor Cost</th>
          <th>Wholesaler Cost</th>
          <th>Retailer Cost</th>
          <th>Total Cost</th>
          <th>Plots</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => {
          counter++;
          return (
            <tr key={game.id}>
              <td>{counter}</td>
              <th>{game.id}</th>
              <td>{game.info_delay} weeks</td>
              <td>{game.holding_cost}</td>
              <td>{game.backlog_cost}</td>
              <td>{game.rounds_completed}/{game.session_length}</td>
              {/* Dummy data */}
              {/* Get data from weeks/roles and add it up */}
              <td>50</td>
              <td>50</td>
              <td>50</td>
              <td>50</td>
              <td>200</td>
              <td><Button variant="secondary">Plots</Button></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
	)
}

export default MonitorGamesList;