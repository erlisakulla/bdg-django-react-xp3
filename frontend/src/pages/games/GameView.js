import React, { Component } from 'react';
import '../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

/**
 * Game display page 
 *
 * @component
 */
class GameView extends Component {
  render() {
    /**
     * Custom CSS style
     * Please don't change this, make changes to Main.css instead
     */
    const main_style = {
      height: '100%',
      margin: '0', 
      padding: '0',
    }

    return (
      <html style={main_style}>
        <body style={main_style}>
          <div>
            {/* -------SCREEN 1 ------- */}
            <div id="div1" className="quadrant">
            <div style={{width: '100%', textAlign: 'left'}}><a href="/join"><ArrowBackIcon/>Back to Assigned Games</a><br/></div>

              <h5 style={{color:'#214da3'}}>RETAILER - GAME 1 - WEEK 1</h5>
              <h5>INPUT SCREEN</h5>
              
              <div className="table-cont">
                <table className="table-input-screen">
                  <tr>
                    <td style={{textAlign:'right'}}>Demand from Role:</td>
                    <td className="value" id="demand">0</td>
                    <td style={{textAlign:'right'}}>Beginning Inventory:</td>
                    <td className="value" id="inventory">0</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid grey'}}>
                    <td style={{textAlign:'right'}}>Backorder:</td>
                    <td className="value" id="backlog">0</td>
                    <td style={{textAlign:'right'}}>Incoming Shipment:</td>
                    <td className="value" id="incoming_shipment">0</td>
                  </tr>
                  <tr>
                    <td style={{textAlign:'right'}}>Total Requirements:</td>
                    <td className="value" id="total_requirements">0</td>
                    <td style={{textAlign:'right'}}>Total Available:</td>
                    <td className="value" id="total_available">0</td>
                  </tr>
                </table>
              </div>

              <div className="my-3">Place your order: </div>
              <form className="form-inline justify-content-center">
                <div className="form-group mx-sm-3 mb-2">
                  <input type="number" name="order_placed" id="order_placed" className="form-control text-center"/>
                </div>
                <input type="submit" className="btn btn-primary mb-2"/>
              </form>
            </div>

            {/* -------SCREEN 2 ------- */}
            <div id="div2" className="quadrant">
              <h5>INFORMATION FOR ALL WEEKS - RETAILER</h5>
              <div className="table-cont">
                <table className="table-input-screen table-weeks" id="table-weeks" border="1">
                  <thead>
                    <tr className="week-info-head">
                      <th>Week Number</th>
                      <th>Inventory</th>
                      <th>Backlog</th>
                      <th >Demand</th>
                      <th>Incoming Shipment</th>
                      <th>Outgoing Shipment</th>
                      <th>Order Placed</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* -------SCREEN 3 ------- */}
            <div id="div3" className="quadrant">
              <h5>STATUS OF OTHER SUPPLY CHAIN MEMBERS - WEEK 1</h5>
              <div className="order-status">
                <p>Once all players have placed an order, you can proceed to the next week.</p>
                <table className="status-table">
                  <thead>
                    <tr>      
                      <th>Retailer</th>
                      <th>Wholesaler</th>
                      <th>Distributor</th> 
                      <th>Factory</th>   
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Order not placed</td>
                      <td>Order placed</td>
                      <td>Order not placed</td>
                      <td>Order placed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="all-orders-placed">
                <p>All orders have been placed for week 1. You can now proceed to the next week.</p>
                <a href="/" type="button" className="btn btn-success">Next Week</a>
              </div>
            </div>
            
            {/* -------SCREEN 4 ------- */}
            <div id="div4" className="quadrant">
              <h5>INVENTORY AND STATUS PLOTS - RETAILER</h5>
              <div class="plot-buttons">
                <button type="button" class="btn btn-primary" id="plot-btn">Inventory</button>
                <button type="button" class="btn btn-primary" id="plot-btn">Demand</button>
                <button type="button" class="btn btn-primary" id="plot-btn">Incoming Shipment</button>
                <button type="button" class="btn btn-primary" id="plot-btn">Outgoing Shimpent</button>
                <button type="button" class="btn btn-primary" id="plot-btn">Order</button>
                <button type="button" class="btn btn-primary" id="plot-btn">Plot All</button>
              </div>

              
              <div class="supply-chain-settings">
                <h5>SUPPLY CHAIN SETTINGS - RETAILER</h5>
                <table class="settings-table">
                  <tr>
                    <td>Holding cost:</td>
                    <td id="val">1</td>
                  </tr>
                  <tr>
                    <td>Backorder cost:</td>
                    <td id="val">2</td>
                  </tr>
                  <tr>
                    <td>Downstream Player:</td>
                    <td id="val">Role</td>
                  </tr>
                  <tr>
                    <td>Upstream Player:</td>
                    <td id="val">Role</td>
                  </tr>
                  <tr>
                    <td>Shipping Delay:</td>
                    <td id="val">2 weeks</td>
                  </tr>
                  <tr>
                    <td>Information Delay:</td>
                    <td id="val">2 weeks</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

export default GameView;