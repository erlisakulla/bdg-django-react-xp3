import React from 'react';
import '../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

/**
 * Registered Games List view 
 *
 * @component
 * @param {Object} roles List of games to be displayed
 * @param {string} message Message shown if there are no games
 */
function RegisteredGamesList(props) {
	const { roles, message } = props;

	if (!roles || roles.length === 0) {
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
          <th>Role Name</th>
          {/* <th>Current Week</th>
          <th>Completed/Ongoing</th>
          <th>Your Cost</th>
          <th>Total Cost</th> */}
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => {
          counter++;
          // this should actually be current active week of game
          return(
            <tr key={role.id}>
              <td>{counter}</td>
              <th>{role.associatedGame}</th>
              <td>{role.roleName}</td>
              {/* <td><a href={`/gameview/${role.associatedGame}/${weekid}`}>Enter Game</a></td> */}
              <td><a href={"/gameview/" + role.associatedGame}>Enter Game</a></td>
              {/* Activate insights only if game is over */}
              <td><a href={"/insights/" + role.associatedGame}>View Insights</a></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
	)
}

export default RegisteredGamesList;