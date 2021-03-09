import React, { Component } from "react";
class Navbar extends React.Component{
    render() {
        return (
            <div>
                
              <nav class="navbar navbar-expand-sm bg-light navbar-light">
              <ul class="navbar-nav">
              <li class="nav-item active">
              <a class="nav-link" href="/">Sign out</a>
              </li>

        </ul>
        </nav>
        <h1 class="header" style={{display: 'flex', justifyContent: 'center'}}>Beer Game</h1>
            </div>
        );
    }
}
export default Navbar;