import React from 'react';
import '../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Popover, OverlayTrigger } from 'react-bootstrap';

/**
 * Players button that triggers popover
 */
class Players extends React.Component {
  render() {
    /**
     * Popover with players list of selected game
     */
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Players of Game 1</Popover.Title>
        <Popover.Content>
          {/* Dummy data, should display actual roles of specific game */}
          <Table>
            <tbody>
              <tr>
                <th>Role</th>
                <td>Player</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>Player</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>Player</td>
              </tr>
            </tbody>
          </Table>
        </Popover.Content>
      </Popover>
    );
    
    return(
      <OverlayTrigger trigger="click" placement="left" overlay={popover}>
        <Button variant="primary">Players</Button>
      </OverlayTrigger>
    )
  }
}

export default Players;