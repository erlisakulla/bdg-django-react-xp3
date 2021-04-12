import React from "react";
import '../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form } from 'react-bootstrap';
import Plot from '../components/plots/Plot';
import { useParams } from 'react-router-dom';

/**
 * Game insights page 
 *
 * @component
 * @param {string} gameid id of game passed as parameter in dynamic link
 */
function GameInsights(props) {
  const { gameid } = useParams();
  const { plotName } = props;

  // const custom_style = {

  // }
  
  return (
    <> 
      <div className="main-container" style={{textAlign:'center'}}>
        <h3>Game {gameid} Insights</h3>

        <Form.Control 
          as="select" 
          id="plot_selector" 
          custom 
          defaultValue="def"
          style={{width:'200px'}}>
            <option value="def" disabled>Select Plot Type</option>
            <optgroup label="Players">
              <option className="selector" value="1">Retailer</option>
              <option className="selector" value="2">Wholesaler</option>
              <option className="selector" value="3">Distributor</option>
              <option className="selector" value="4">Factory</option>
            </optgroup>
            <optgroup label="Supply Chain">
              <option className="selector" value="5">Inventory/Backlog</option>
              <option className="selector" value="6">Demand</option>
              <option className="selector" value="9">Order</option>
            </optgroup>
        </Form.Control>

        <Card style={{padding:'50px', margin:'15px'}}>
          <Plot plot={plotName} gameid={gameid}/>
        </Card>
      </div>
    </>
  );
}

export default GameInsights;