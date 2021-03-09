import React, { Component } from 'react';
import top from '../css/top.css';
import '../css/Main.css';
import { Button, Table } from 'react-bootstrap'
import Navbar from '../components/Navbar.js';


export default class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Gameid: "",
      Gamenb: 1,
      Role: "retailer",
      weeknb: 1,
      Inventory: 5,
      week_demand: 3,
      backorder: 0,
      total_demand: 3,
      incoming_shipment: 2,
      week_unit_shipped: 4,
      total_available: 7,
      request: 0,
      holding_cost: 0.5,
      Backorder_cost: 1,
      Distributor_has_ordered: false,
      Wholesaler_has_ordered: false,
      Manufacturer_has_ordered: false,
      downstream : "Customers",
      Upstream: "Wholesaler",
      down_ship_info_delay: 2,
      up_ship_info_delay: 2
    };
  }
  onChangerequest = (e) => {
    this.setState({ request: e.target.value });
};
  render() {
    return (
      <div >
          <Navbar/>
        <label className= "top">Playing as retailer (Week {this.state.weeknb})</label>
        <form  className= "ttop">
        <label className= "top">Demand: {this.state.week_demand}</label>
        <label className = "top">Backorder: {this.state.backorder}</label>
        <label className = "top">Total demand: {this.state.total_demand}</label>
        </form>
        <form  className= "mid">
        <label className= "top">Inventory: {this.state.Inventory}</label>
        <label className = "top">Incoming Shipment: {this.state.incoming_shipment}</label>
        <label className = "top">Total available: {this.state.total_available}</label>
        </form>
        <form  className= "mid">
        <label className= "top">The number of units needed this week:</label>
        <input type="text" id="Demand" name="demand" value={this.state.request} onChange={this.onChangerequest}/>
        <div >
        <button  onClick={this.sendForm} >Submit</button>
        </div>
        </form>
        <form  className= "ttop">
        <label className= "top">Retailer Information for the last ten weeks:</label>
        <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Inventory</th>
                  <th>Demand</th>
                  <th>Incoming shipment</th>
                  <th>Outgoing shipment</th>
                  <th>Order placed</th>
                  <th>Current cost</th>
                </tr>
              </thead>
              <tbody>
              <tr>
              <td>{this.state.weeknb}</td>
              <td>{this.state.Inventory}</td>
              <td>{this.state.week_demand}</td>
              <td>{this.state.incoming_shipment}</td>
              <td>{(this.state.Inventory<1) ? 0 :  (this.state.Inventory-this.state.week_demand>0) ? this.state.week_demand : this.state.Inventory}</td>
              <td>{this.state.request}</td>
              <td>{(this.state.Inventory > 0) ? this.state.Inventory*this.state.holding_cost : this.state.Inventory*this.state.Backorder_cost}</td>      
              </tr>
              </tbody>
            </Table>
        </form>
        <form  className= "ttop">
        <label className= "top" >Status of other supply Chain Channel Members of game {this.state.Gamenb}</label>
        <p></p>
        <label className = "top">Distributor:  {(this.state.Distributor_has_ordered) ? <h>Has</h> : <h>Has not</h>} ordered</label>
        <label className = "top">Wholesaler:  {(this.state.Wholesaler_has_ordered) ? <h>Has</h> : <h>Has not</h>} ordered</label>
        <label className = "top">Manufacturer:  {(this.state.Manufacturer_has_ordered) ? <h>Has</h> : <h>Has not</h>} ordered</label>
        </form>
        <form  className= "ttop">
        <label className= "top" >Inventory and Order Status plots for retailer</label>
        <p></p>
        <button>Demand Plot</button>
        <button>Order Plot</button>
        <button>Inventory/Backorder Plot</button>
        <button>Plot all</button>
        <p></p>
        <label className= "top" >Supply Chain Settings for retailer:</label>
        <p></p>
        <label >Holding cost:  {this.state.holding_cost}</label>
        <p></p>
        <label >Backorder cost:  {this.state.Backorder_cost}</label>
        <p></p>
        <label >Downstream player:  {this.state.downstream}</label>
        <p></p>
        <label >Upstream player:  {this.state.Upstream}</label>
        <p></p>
        <label >Shipping Delay:  (down {this.state.down_ship_info_delay} weeks, up {this.state.up_ship_info_delay} weeks)</label>
        <p></p>
        <label >Information Delay:  (down {this.state.down_ship_info_delay} weeks, up {this.state.up_ship_info_delay} weeks)</label>
        </form>
      </div>
    );
  }
}