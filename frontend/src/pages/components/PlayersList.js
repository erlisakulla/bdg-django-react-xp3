import React from 'react';
import '../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, OverlayTrigger, Button, Popover } from 'react-bootstrap';
import axiosInstance from '../../axios'


/**
 * Players List 
 *
 * @component
 */
class PlsyersList extends React.Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this);
    
    /**
     * Roles display states
     */
    this.state = {
      roles: null,
      message: 'No roles to display',
    }
  }

  // This actually gets the available roles for the selected game
  // however with another api link it could be changed to get all players
  /**
   * Method to get all player and role data for specific game
   *
   * @method
   */
  componentDidMount() {
    axiosInstance.get(`http://127.0.0.1:8000/api/game/${this.props.gameid}/getroles`)
    .then((res) => {
      this.setState({roles: res.data});
      console.log(res.data);
      console.log(this.state.roles);
    });
  }

  render() {
    if (!this.state.roles || this.state.roles.length === 0) {
      return ( 
        <p style={{textAlign:'center', color:'grey'}}>{this.state.message}</p>
      );
    }

    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Players of Game {this.props.gameid}</Popover.Title>
        <Popover.Content>
          <Table>
            <tbody>
              {this.state.roles.map((role) => {
                return (
                  <tr key={role.id}>
                    <th>{role.roleName}</th>
                    <td>{role.playedBy}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Popover.Content>
      </Popover>
    );

    return (
      <> 
        <OverlayTrigger trigger="click" placement="left" overlay={popover}>
          <Button variant="primary">Players</Button>
        </OverlayTrigger>
      </>
    );
  }
}

export default PlsyersList;