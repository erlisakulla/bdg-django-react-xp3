import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function Option(props) {
  return(
    <OverlayTrigger
      key="bottom"
      placement="bottom"
      overlay={
        <Tooltip id="tooltip-bottom">
          {props.name}
        </Tooltip>
      }
    >
      {props.icon}
    </OverlayTrigger>
  );
}

export default Option;