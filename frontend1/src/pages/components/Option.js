import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

/**
 * Option (edit, delete, ..)
 *
 * @param {string} props.name option name
 * @param {Icon} props.icon option material-ui icon
 */
function Option(props) {
  return(
    <OverlayTrigger
      key="bottom"
      placement="bottom"
      overlay={
        <Tooltip id="tooltip-bottom">
          {props.name}
        </Tooltip>
      }>
      {props.icon}
    </OverlayTrigger>
  );
}

export default Option;