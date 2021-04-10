import React from "react";
import CanvasJSReact from './canvasjs.react.js';
import '../../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useParams } from 'react-router-dom';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

/**
 * Plot component 
 *
 * @component
 * @param {string} gameid id of game passed as parameter in dynamic link
 */
function Plot(props){
  const { gameid } = props;
  // sample data to be displayed
  // pass it as param
  const options = {
    animationEnabled: true,	
    theme: "light2",
    title:{
      text: "Inventory/Backlog of the Supply Chain for Game " + gameid,
    },
    axisY : {
      title: "Inventory/Backorder"
    },
    axisX : {
      title: "Week"
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "line",
      name: "Factory",
      showInLegend: true,
      dataPoints: [
        { y: 155, label: "1" },
        { y: 150, label: "2" },
        { y: 152, label: "3" },
        { y: 148, label: "4" },
        { y: 142, label: "5" },
      ]
    },
    {
      type: "line",
      name: "Distributor",
      showInLegend: true,
      dataPoints: [
        { y: 150, label: "1" },
        { y: 150, label: "2" },
        { y: 150, label: "3" },
        { y: 150, label: "4" },
        { y: 150, label: "5" },
      ]
    },
    {
      type: "line",
      name: "Wholesaler",
      showInLegend: true,
      dataPoints: [
        { y: 172, label: "1" },
        { y: 172, label: "2" },
        { y: 172, label: "3" },
        { y: 172, label: "4" },
        { y: 172, label: "5" },
      ]
    },
    {
      type: "line",
      name: "Retailer",
      showInLegend: true,
      dataPoints: [
        { y: 172, label: "1" },
        { y: 173, label: "2" },
        { y: 175, label: "3" },
        { y: 172, label: "4" },
        { y: 162, label: "5" },
      ]
    }]
  }

  return (
    <CanvasJSChart options={options}/>
  );

}

export default Plot;