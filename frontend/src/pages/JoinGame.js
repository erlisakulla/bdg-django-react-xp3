import React, { Component } from 'react';
import '../css/Main.css';
import Navbar from '../components/Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Nav } from 'react-bootstrap';

// Main Render
class JoinGames extends Component {
  render() {
    return (
      <div> 
          <Navbar/>
          <div className="main-container">
            <h2>Join Games</h2>
            <p>Here you can view and join all assigned games to you.</p>
            <hr/>

            <Card>
              <Card.Header>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link href="/create">Setup Games</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/monitor">Monitor Games</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/join" className="active">Join Games</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Table responsive className="gamesList">
                  <thead>
                    <tr>
                      <th>Game ID</th>
                      <th>Current Week</th>
                      <th>Role Name</th>
                      <th>Completed/Ongoing</th>
                      <th>Your Cost</th>
                      <th>Total Cost</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>3/24</td>
                      <td>RETAILER</td>
                      <td>Ongoing</td>
                      <td>50</td>
                      <td>250</td>
                      <td><a href="/student/role">Enter Game</a></td>
                      <td><a href="/join">View Insights</a></td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
      </div>
    );
  }
}

export default JoinGames;