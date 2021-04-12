import React from 'react';
import '../../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../../axios'

/**
 * Shared Info List 
 *
 * @component
 */
class SharedInfo extends React.Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this);
    
    this.state = {
      sharedInfo: null,
      message: 'No info to display',
    }
  }

  /**
   * Method to get order staus
   *
   * @method
   */
  componentDidMount() {
    axiosInstance.get(`http://127.0.0.1:8000/api/role/${this.props.roleid}/getsharedinfo/`)
    .then((res) => {
      this.setState({sharedInfo: res.data});
      // console.log(res.data);
      // console.log(this.state.sharedInfo);
    })
    .catch(error => {if(error.response){console.log(error.response.data);}});
  }

  render() {
    if (!this.state.sharedInfo || this.state.sharedInfo.length === 0) {
      return ( 
        <p style={{textAlign:'center', color:'grey'}}>{this.state.message}</p>
      );
    }

    return (
      <> 
        <table className="status-table">
          <thead>
            <tr>
              {this.state.sharedInfo.map((r) => {
                return (
                  <th key={r.Role}>{r.Role}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {this.state.sharedInfo.map((r) => {
                if (r.OrderPlaced === false) {
                  return (<td style={{color:'red'}} key={r.Role}>Order not placed</td>);
                }
                else {
                  return (<td style={{color:'green'}} key={r.Role}>Order placed</td>);
                }
              })}
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default SharedInfo;