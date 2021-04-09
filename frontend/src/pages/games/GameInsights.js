import React from 'react';
import '../../css/Main.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

/**
 * Displays selected Game Insights 
 *
 * @component
 */
function GameInsights() {
  const { gameid } = useParams();
  return (
    <> 
      <Navbar/>
      
      <div className="main-container">
        <Card>
          Game {gameid}
        </Card>
      </div>
    </>
  );
}

export default GameInsights;