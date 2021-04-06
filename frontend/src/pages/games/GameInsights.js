import React, { Component } from 'react';
import '../../css/Main.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

/**
 * Displays selected Game Insights 
 *
 * @component
 */
class GameInsights extends Component {
  render() {
    return (
      <> 
        <Navbar/>
        
        <div className="main-container">
          <Card>
            
          </Card>
        </div>
      </>
    );
  }
}

export default GameInsights;