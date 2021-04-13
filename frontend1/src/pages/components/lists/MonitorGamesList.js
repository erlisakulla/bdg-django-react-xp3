import React from 'react';
import '../../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayIcon from '@material-ui/icons/Today';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

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
    <>
      <Table responsive className="gamesList">
        <thead>
          <tr>
            <th>#</th>
            <th>Game ID<br/><VideogameAssetIcon/></th>
            <th>Time Delay<br/><AccessTimeIcon/></th>
            <th>Holding Cost<br/><LocalAtmIcon/></th>
            <th>Backorder Cost<br/><LocalAtmIcon/></th>
            <th>Current Week<br/><TodayIcon/></th>
            <th>Factory Cost<br/><LocalAtmIcon/></th>
            <th>Distributor Cost<br/><LocalAtmIcon/></th>
            <th>Wholesaler Cost<br/><LocalAtmIcon/></th>
            <th>Retailer Cost<br/><LocalAtmIcon/></th>
            <th>Total Cost<br/><LocalAtmIcon/></th>
            <th>Plots<br/><EqualizerIcon/></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            counter++;
            return (
              <tr key={counter}>
                <td>{counter}</td>
                <th>{game.game_id}</th>
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
                <td><Button className="plots-table-btn" variant="secondary" href={`/insights/${game.game_id}`}>Plots</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default MonitorGamesList;