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
class PlotAll extends React.Component {
  constructor(props){
    super(props);

    this.handleModalShowHide = this.handleModalShowHide.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    
    this.state = {
      showHide : false, // modal default state is hide
      options: '',
      inventoryData: '',
      demandData: '',
      orderData: '',
      incShipData: '',
      outShipData: '',
    }
  }

  componentDidMount() {
    axiosInstance.get(`http://127.0.0.1:8000/api/game/${this.props.gameid}/getweeks/`)
    .then((res) => {
      const allWeeks = res.data;
      console.log(res.data);
      for (var i = 0; i < allWeeks.length; i++) {
        const dem = allWeeks[i].demand;
        const inv = allWeeks[i].inventory;
        const oship = allWeeks[i].outgoing_shipment;
        const iship = allWeeks[i].incoming_shipment;
        const ord = allWeeks[i].order_placed;
        const num = allWeeks[i].number;

        this.setState(previousState => ({inventoryData: [...previousState.inventoryData, {y: inv, label: `${num}`}]}));
        this.setState(previousState => ({demandData: [...previousState.demandData, {y: dem, label: `${num}`}]}));
        this.setState(previousState => ({orderData: [...previousState.orderData, {y: ord, label: `${num}`}]}));
        this.setState(previousState => ({incShipData: [...previousState.incShipData, {y: iship, label: `${num}`}]}));
        this.setState(previousState => ({outShipData: [...previousState.outShipData, {y: oship, label: `${num}`}]}));
      }

      this.setState({ 
        options: {
          animationEnabled: true,	
          theme: "light2",
          width: 700,
          title:{
            text: "Plot All",
          },
          axisY : {
            title: "Quantity"
          },
          axisX : {
            title: "Week"
          },
          toolTip: {
            shared: true
          },
          data: [
            {
              type: "line",
              name: "Inventory/Backlog",
              showInLegend: true,
              dataPoints: this.state.inventoryData,
            },
            {
              type: "line",
              name: "Order",
              showInLegend: true,
              dataPoints: this.state.orderData,
            },
            {
              type: "line",
              name: "Incoming Shipment",
              showInLegend: true,
              dataPoints: this.state.incShipData,
            },
            {
              type: "line",
              name: "Outgoing Shipment",
              showInLegend: true,
              dataPoints: this.state.outShipData,
            },
            {
              type: "line",
              name: "Demand",
              showInLegend: true,
              dataPoints: this.state.demandData,
            },
          ]
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
            Plot All
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
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default PlotAll;