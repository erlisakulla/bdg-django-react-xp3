// import React, { Component } from 'react';
// import axios from 'axios';
// import '../css/SignIn.css'


// export default class UserMain extends Component {

//     render() {
//         return (
//             <div>
//                 <h1> Welcome to the User Main Page!</h1>
//             </div>
//     );
//   }
// }

import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap'
import top from '../css/top.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Main.css';
import Navbar from '../components/Navbar.js';


export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Gameid: "",
      Gamenb: "",
      Role: "",
      weeknb: "",
    };
  }
  onChangeGameid = (e) => {
    this.setState({ Gameid: e.target.value });
};

onChangeRole = (e) => {
  if(e.target.value === "Retailer"){
    this.setState({Role: "Retailer"});
  }
  else{
    if(e.target.value === "Wholesaler"){
      this.setState({Role: "Wholesaler"});
    }
    else{
      if(e.target.value === "Distributor"){
        this.setState({Role: "Distributor"});
      }
      else{
        this.setState({Role: "Manufacturer"});
      }
    }
  }
};
sendForm = (e) => {
  e.preventDefault();
    if(this.state.Role === "Manufacturer"){
      window.location = 'http://localhost:3000/student/role'
    }
    else{
      if(this.state.Role === "Wholesaler"){
        window.location = 'http://localhost:3000/student/role'
      }
      else{
        if(this.state.Role === "Distributor"){
          window.location = 'http://localhost:3000/student/role'
        }
        else{
          window.location = 'http://localhost:3000/student/role'
        }
      }
    }
};

    render() {
      return (
        <div > 
            <Navbar/>
          <label>Logged in as Player</label>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Game id</th>
                  <th>Role</th>
                  <th>Week Number</th>
                  <th>Join game</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>retailer</td>
                  <td>1</td>
                  <td><Link to="/student/role">join</Link></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Distributor</td>
                  <td>1</td>
                  <td><Link to="/student/role">join</Link></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Wholoesaler</td>
                  <td>1</td>
                  <td><Link to="/student/role">join</Link></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Manufacturer</td>
                  <td>1</td>
                  <td><Link to="/student/role">join</Link></td>
                </tr>
              </tbody>
            </Table> 
            <section className="content-wrapper">
                      <div className="login">
                        <div className = "box">
                                <h2>New Game: </h2>
                                <label >Game id</label>
                                <input type="text" id="Gameid" name="Gameid" value={this.state.Gameid} onChange={this.onChangeGameid}/>
                                <p></p>
                                <select name="Role" defaultValue="retailer" id="Role" onChange={this.onChangeRole}> 
                                    <option value="Retailer">Retailer</option> 
                                    <option value="Wholersaler" >Wholersaler</option> 
                                    <option value="Distributor" >Distributor</option> 
                                    <option value="Manufacturer" >Manufacturer</option> 
                                </select> 
                                <div className="buttonContainer">
                                    <button  onClick={this.sendForm}>Join game</button>
                                </div>
                      </div>
                    </div>
                </section> 
        </div>
      );
    }
  }
