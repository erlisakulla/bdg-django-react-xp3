import React from 'react';
import '../../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../../axios'

/**
 * Week Info List 
 *
 * @component
 */
class WeeksInfo extends React.Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this);
    
    this.state = {
      allWeeks: null,
      message: 'No weeks to display',
    }
  }

  /**
   * Method to get week data
   *
   * @method
   */
  componentDidMount() {
    axiosInstance.get(`http://127.0.0.1:8000/api/game/${this.props.gameid}/getweeks/`)
    .then((res) => {
      this.setState({allWeeks: res.data});
      // console.log(res.data);
      // console.log(this.state.allWeeks);
    })
    .catch(error => {if(error.response){console.log(error.response.data);}});
  }

  render() {
    if (!this.state.allWeeks || this.state.allWeeks.length === 0) {
      return ( 
        <p style={{textAlign:'center', color:'grey'}}>{this.state.message}</p>
      );
    }

    return (
      <> 
        <table className="table-input-screen table-weeks" id="table-weeks" border="1">
          <thead>
            <tr className="week-info-head">
              <th>Week Number</th>
              <th>Inventory</th>
              <th>Backlog</th>
              <th>Demand</th>
              <th>Incoming Shipment</th>
              <th>Outgoing Shipment</th>
              <th>Order Placed</th>
              <th>Current Cost</th>
            </tr>
          </thead>
          <tbody>
            {this.state.allWeeks.map((w) => {
              return (
                <tr key={w.id}>
                  <td>{w.number}</td>
                  <td>{w.inventory}</td>
                  <td>{w.backlog}</td>
                  <td>{w.demand}</td>
                  <td>{w.incoming_shipment}</td>
                  <td>{w.outgoing_shipment}</td>
                  <td>{w.order_placed}</td>
                  <td>{w.cost}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default WeeksInfo;