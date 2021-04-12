import React, { useState } from "react";
import '../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import InventoryPlot from '../components/plots/insights/InventoryPlot';

/**
 * Game insights page 
 *
 * @component
 * @param {string} gameid id of game passed as parameter in dynamic link
 */
function GameInsights(props) {
  const { gameid } = useParams();
  const [selectedPlot, setSelectedPlot] = useState('');

  const selectPlot = (e) => {
    setSelectedPlot(e.target.value)
    console.log(selectedPlot);
  }

  return (
    <> 
      <div className="main-container" style={{textAlign:'center'}}>
        <div style={{textAlign: 'center'}}><a href="/join"><ArrowBackIcon/>Back to Joined Games</a><br/></div>

        <h3>Game {gameid} Insights</h3>

        <Form.Control 
          as="select" 
          id="plot_selector" 
          custom 
          defaultValue="def"
          onChange={selectPlot}
          style={{width:'200px'}}>
            <option value="def" disabled>Select Plot Type</option>
            <optgroup label="Players">
              {/* Plots with inventory, order, demand data for each role */}
              <option className="selector" value="Retailer">Retailer</option>
              <option className="selector" value="Wholesaler">Wholesaler</option>
              <option className="selector" value="Distributor">Distributor</option>
              <option className="selector" value="Factory">Factory</option>
            </optgroup>
            <optgroup label="Supply Chain">
              {/* Plots with specific data for all roles in one plot */}
              <option className="selector" value="Inventory">Inventory/Backlog</option>
              <option className="selector" value="Demand">Demand</option>
              <option className="selector" value="Order">Order</option>
            </optgroup>
        </Form.Control>

        <Card style={{padding:'50px', margin:'15px'}}>
          {
            // (selectedPlot === "Retailer") ?
            //   <Plot plot={plotName} gameid={gameid}/> :
            // (selectedPlot === "Wholesaler") ?
            //   <Plot plot={plotName} gameid={gameid}/> :
            // (selectedPlot === "Distributor") ?
            //   <Plot plot={plotName} gameid={gameid}/> :
            // (selectedPlot === "Factory") ?
            //   <Plot plot={plotName} gameid={gameid}/> :

            // For now plots display only current role data, but could be changed to display all roles
            // (selectedPlot === "Inventory") ?
            //   <InventoryPlot gameid={gameid}/> :
            // (selectedPlot === "Demand") ?
            //   <Plot plot={plotName} gameid={gameid}/> :
            // (selectedPlot === "Order") ?
            //   <Plot plot={plotName} gameid={gameid}/> :
            // null
          }
        </Card>
      </div>
    </>
  );
}

export default GameInsights;