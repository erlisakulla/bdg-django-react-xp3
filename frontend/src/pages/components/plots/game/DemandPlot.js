import React from "react";
import CanvasJSReact from '../canvasjs.react.js';
import '../../../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap'
import axiosInstance from '../../../../axios';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

/**
 * Plot component
 *
 * @component
 */
class InventoryPlot extends React.Component {
  constructor(props){
    super(props);

    this.handleModalShowHide = this.handleModalShowHide.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    
    this.state = {
      showHide : false, // modal default state is hide
      options: '',
      dataPoints: '',
    }
  }

  componentDidMount() {
    axiosInstance.get(`http://127.0.0.1:8000/api/game/${this.props.gameid}/getweeks/`)
    .then((res) => {
      const allWeeks = res.data;
      // console.log(res.data);
      for (var i = 0; i < allWeeks.length; i++) {
        const dem = allWeeks[i].demand;
        const num = allWeeks[i].number;
        const data = {y: dem, label: `${num}`};

        this.setState(previousState => ({dataPoints: [...previousState.dataPoints, data]}));
      }

      this.setState({ 
        options: {
          animationEnabled: true,	
          theme: "light2",
          width: 700,
          title:{
            text: "Demand",
          },
          axisY : {
            title: "Demand"
          },
          axisX : {
            title: "Week"
          },
          toolTip: {
            shared: true
          },
          data: [{
            type: "line",
            color: "red",
            name: "Demand",
            showInLegend: true,
            dataPoints: this.state.dataPoints,
          }]
        } 
      });      
    })
    .catch(error => {if(error.response){console.log(error.response.data);}});
  }

  /**
   * Handle to change modal state when clicked on a component
   */
  handleModalShowHide() {
    this.setState({showHide: !this.state.showHide})
    this.setState({errors: null});
  }

  render() {
    return(
      <>
        <div>
          <Button variant="primary" onClick={() => this.handleModalShowHide()} className="plot-btn">
            Demand
          </Button>
        </div>
        
        <Modal size="xl" show={this.state.showHide} onHide={() => this.handleModalShowHide()} dialogClassName="modal-plot">
          <Modal.Header closeButton>
          </Modal.Header>

          <Modal.Body>
            <CanvasJSChart options={this.state.options} className="plot"/>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="danger" onClick={() => this.handleModalShowHide()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default InventoryPlot;