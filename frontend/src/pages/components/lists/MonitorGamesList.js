import React from 'react';
import '../../../css/Main.css';
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
	const { games, message, is_instructor } = props;

	if (!games || games.length === 0) {
		return ( 
			<h5 style={{textAlign:'center', fontWeight:'400', color:'grey'}}>{message}</h5>
		);
	}

	/**
	 * Counter variable for row number
	 */
	let counter = 0;

  if (is_instructor === true) {
    return (
      <>
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
                <tr key={counter}>
                  <td>{counter}</td>
                  <th>{game.id}</th>
                  <td>{game.info_delay} weeks</td>
                  <td>{game.holding_cost}</td>
                  <td>{game.backlog_cost}</td>
                  <td>{game.current_week}/{game.session_length}</td>
                  {/* Dummy data */}
                  {/* Get data from weeks/roles and add it up */}
                  <td>{game.cost.Factory}</td>
                  {
                    (game.cost.Distributor) ?
                    <td>{game.cost.Distributor}</td> :
                    <td>---</td>
                  }
                  {
                    (game.cost.Wholesaler) ?
                    <td>{game.cost.Wholesaler}</td> :
                    <td>---</td>
                  }
                  <td>{game.cost.Retailer}</td>
                  <td>{game.cost.total}</td>
                  <td><Button variant="secondary" href={`/insights/${game.id}`}>Plots</Button></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
  else {
    return (
      null
    );
  }
	
}

export default MonitorGamesList;