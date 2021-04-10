import React, { useEffect, useState } from 'react';
import '../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

/**
 * Game display page 
 *
 * @component
 * @param {string} gameid id of game passed as parameter in dynamic link
 */
function GameView() {
  const { gameid } = useParams();

  // const allWeeks = null;
  // const ordersStatus = null;

  const [game, setGameSettings] = useState({
    active: '',
    backlog_cost: '',
    holding_cost: '',
    info_delay: '',
    rounds_completed: '',
    session_length: '',
    starting_inventory: '',
    wholesalerPresent: '',
    distributorPresent: '',

    is_completed: false,
    current_week: 1,
  });

  // const [week, setWeekSettings] = useState({
  const week = {
    // id: '',
    number: 1,
    inventory: 0,
    backlog: 0,
    demand: 0,
    incomingShipment: 0,
    outgoingShipment: 0,
    orderPlaced: null,
    cost: 0,
    associatedRole: '',

    // if all orders are placed, patch game.current_week++ so when it reloads, state is saved
    all_orders_placed: false,
    order_is_placed: false,
  };

  const [role, setRoleSettings] = useState({
    id: '',
    roleName: null,
    associatedGame: '',
    downstreamPlayer: '',
    upstreamPlayer: '',
  });

  useEffect(() => {
    // Geting and setting game data
    axiosInstance.get(`http://127.0.0.1:8000/api/game/${gameid}`)
    .then((res) => {
      setGameSettings(s => ({
        active: true,
        // active: res.data.active,
        holding_cost: res.data.holding_cost,
        backlog_cost: res.data.backlog_cost,
        info_delay: res.data.info_delay,
        rounds_completed: res.data.rounds_completed,
        session_length: res.data.session_length,
        starting_inventory: res.data.starting_inventory,
        distributorPresent: res.data.distributorPresent,
        wholesalerPresent: res.data.wholesalerPresent,
        is_completed: false,
      }));
      console.log(res.data);
    })
    .catch(error => {
      if(error.response) {
        console.log(error.response.data);
        alert('Game not found');
        window.location = "/monitor";
      }
    });

    if (game.active === true) {
      // Getting and setting role data
      // create a view /api/game/{gameid}/role/{id} to make this easier and load less data
      axiosInstance.get('http://127.0.0.1:8000/api/role/')
      .then((res) => {
        console.log(res.data);
        const allRoles = res.data;

        var i, rid;
        for (i = 0; i < allRoles.length; i++) {
          if (parseInt(gameid) === allRoles[i].associatedGame) {
            rid = allRoles[i].id;
            axiosInstance.get(`http://127.0.0.1:8000/api/role/${rid}/`)
            .then((res) => {
              console.log(res.data);
              setRoleSettings(s => ({
                id: res.data.id,
                roleName: res.data.roleName,
                associatedGame: res.data.associatedGame,
                downstreamPlayer: res.data.downstreamPlayer,
                upstreamPlayer: res.data.upstreamPlayer,
              }));
            })
            .catch(error => {if(error.response){console.log(error.response.data);}});
          } 
        }      
      }).catch(error => {if(error.response){console.log(error.response.data);}});  
    } 
  }, [setGameSettings, setRoleSettings, gameid, game.active]);
      // // Getting and setting week data
      // // axiosInstance.get(`/api/week/${week.id}`)
      // if (role.roleName != null) {
      //   axiosInstance.get(`/api/game/${gameid}/role/${role.id}/week/${week.number}/`)
      //   .then((res) => {
      //     setWeekSettings(s => ({
      //       id: res.data.id,
      //       number: res.data.number,
      //       inventory: res.data.inventory,
      //       backlog: res.data.backlog,
      //       demand: res.data.demand,
      //       incomingShipment: res.data.incomingShipment,
      //       outgoingShipment: res.data.outgoingShipment,
      //       orderPlaced: res.data.orderPlaced,
      //       cost: res.data.cost,
      //       associatedRole: res.data.associatedRole,
      //     }));
      //     console.log(res.data);
      //   })
      //   .catch(error => {if(error.response) {console.log(error.response.data)}});

      //   // Gettings all weeks that have been completed
      //   axiosInstance.get(`/api/game/${gameid}/role/${role.id}/getweeks/`)
      //   .then((res) => {
      //     console.log(res.data);
      //     if (res.data.orderPlaced != null) {
      //       const allweeks = res.data;
      //       setState(previousState => ({allWeeks: [...previousState.allWeeks, allweeks]}));
      //     }
      //   })
      //   .catch(error => {if(error.response) {console.log(error.response.data)}});

      //   // Getting and setting order statuses
      //   axiosInstance.get(`/api/game/${gameid}/week/${week.id}/getroles/`)
      //   .then((res) => {
      //     console.log(res.data);
      //     const statuses = res.data;
      //     setState(previousState => ({ordersStatus: [...previousState.ordersStatus, statuses]}));
      //   })
      // }
      // else {
      //   alert("You're not registered to this game");
      // }
      // .catch(error => {if(error.response) {console.log(error.response.data)}});
	// }, [setGameSettings, setRoleSettings, gameid, game.active, role.id, role.number, role.roleName, week.id, week.number]);
  
  // Order input changed
  const onOrderChange = (e) => {
    week.orderPlaced = e.target.value;
    console.log(week.orderPlaced);  
  }
  // Submitting order
  const submitOrder = (e) => {
    e.preventDefault();
    const order = week.orderPlaced;

    axiosInstance.patch(`http://127.0.0.1:8000/api/game/${gameid}/week/${week.id}`, order)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("Order submitted successfuly");
        // post order and order status to week
        // setWeekSettings({order_is_placed: true});
      }
    })
    .catch(error => {
      if(error.response){ 
        alert("Couldn't submit order.");
        console.log(error.response.data);
      }
    });;
  }

  // Checking if current player has submitted order
  const orderIsPlaced = (
    (week.order_is_placed === false && game.is_completed === false) ?
    <>
      <div className="my-3">Place your order: </div>
      <form className="form-inline justify-content-center" onSubmit={submitOrder}>
        <div className="form-group mx-sm-3 mb-2">
          <input type="number" name="order_placed" id="order_placed" className="form-control text-center" onChange={onOrderChange} required/>
        </div>
        <input type="submit" className="btn btn-primary mb-2"/>
      </form>
    </> : 
    (week.order_is_placed === true && game.is_completed === false) ? 
    <div class="order-is-placed">
      Your order is: <b>{week.orderPlaced}</b> <br/>
      Your shipment is: <b>{week.incomingShipment}</b><br/>
      Inventory at week {week.number}: <b>{week.inventory}</b> <br/>
      Current cost: <b>{week.cost}</b> <br/>
      <p>Please wait until all orders have been placed to proceed to the next week.</p>
    </div> : 
    (game.is_completed === true) ?
    <h3>Game completed for you! Wait for others to finish their round!</h3> : 
    null
  );

  // Checking if all orders have been placed
  const nextWeekBtn = (
    (week.all_orders_placed === true) ?
    <div className="all-orders-placed">
      <p>All orders have been placed for week {week.number}. You can now proceed to next week.</p>
      {/* <a href={`/game/${gameid}/${weekid}`} type="button" className="btn btn-success">Next Week</a> */}
      <a href={`/gameview/${gameid}`} type="button" className="btn btn-success">Next Week <NavigateNextIcon/></a>
    </div> : null
  );

  // Checking for upstream and downstream roles
  if (role.roleName === "Retailer") {
    role.downstreamPlayer = "Customer";
  }

  if (role.roleName === "Factory") {
    role.upstreamPlayer = "Brewry";
  }

  // For week 1, inventory = starting_inventory
  if (week.number === 1) {
    week.inventory = game.starting_inventory;
  }

  // Displaying gameview only if game is active
  if (game.active === true) {
    if (role.roleName === null) {
      return (
        <>
          <h5 style={{textAlign:'center', fontWeight:'400', color:'grey', padding:'50px'}}>You're not registered for this game</h5>
          <div style={{textAlign: 'center'}}><a href="/monitor"><ArrowBackIcon/>Back to Assigned Games</a><br/></div>
        </>
      );
    }
    else {
      return (
        <div>
          {/* -------SCREEN 1 ------- */}
          <div id="div1" className="quadrant">
          <div style={{width: '100%', textAlign: 'left'}}><a href="/join"><ArrowBackIcon/>Back to Assigned Games</a><br/></div>

            {/* Get week number from week instead */}
            <h5 style={{color:'#214da3'}}>{role.roleName} - GAME {gameid} - WEEK {week.number}</h5>
            <h5>INPUT SCREEN</h5>
            
            <div className="table-cont">
              <table className="table-input-screen">
                <tbody>
                  <tr>
                    <td style={{textAlign:'right'}}>Demand from {role.downstreamPlayer}:</td>
                    <td className="value" id="demand">{week.demand}</td>
                    <td style={{textAlign:'right'}}>Beginning Inventory:</td>
                    <td className="value" id="inventory">{week.inventory}</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid grey'}}>
                    <td style={{textAlign:'right'}}>Backorder:</td>
                    <td className="value" id="backlog" style={{color:'red'}}>{week.backlog}</td>
                    <td style={{textAlign:'right'}}>Incoming Shipment:</td>
                    <td className="value" id="incoming_shipment" style={{color:'green'}}>{week.incomingShipment}</td>
                  </tr>
                  <tr>
                    <td style={{textAlign:'right'}}>Total Requirements:</td>
                    <td className="value" id="total_requirements" style={{color:'blue'}}>{week.demand + week.backlog}</td>
                    <td style={{textAlign:'right'}}>Total Available:</td>
                    <td className="value" id="total_available" style={{color:'blue'}}>{week.inventory + week.incomingShipment}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {orderIsPlaced}

          </div>

          {/* -------SCREEN 2 ------- */}
          <div id="div2" className="quadrant">
            <h5>INFORMATION FOR ALL WEEKS - {role.roleName}</h5>
            <div className="table-cont">
              <table className="table-input-screen table-weeks" id="table-weeks" border="1">
                <thead>
                  <tr className="week-info-head">
                    <th>Week Number</th>
                    <th>Inventory</th>
                    <th>Backlog</th>
                    <th>Demand</th>
                    <th>Incoming Shipment</th>
                    <th>Outgoing Shipment</th>
                    <th>Order Placed</th>
                    <th>Current Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {allWeeks.map((w) => {
                    return (
                      <tr key={w.id}>
                        <td>{w.number}</td>
                        <td>{w.inventory}</td>
                        <td>{w.backlog}</td>
                        <td>{w.demand}</td>
                        <td>{w.incomingShipment}</td>
                        <td>{w.outgoingShipment}</td>
                        <td>{w.orderPlaced}</td>
                        <td>{w.cost}</td>
                      </tr>
                    );
                  })} */}
                </tbody>
              </table>
            </div>
          </div>

          {/* -------SCREEN 3 ------- */}
          <div id="div3" className="quadrant">
            <h5>STATUS OF OTHER SUPPLY CHAIN MEMBERS - WEEK {week.number}</h5>
            <div className="order-status">
              <p>Once all players have placed an order, you can proceed to next week.</p>
              <table className="status-table">
                <thead></thead>
                {/* <thead>
                  <tr>
                    {ordersStatus.map((r) => {
                      return (
                        <th>{r.roleName}</th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {ordersStatus.map((r) => {
                      if (r.orderIsPlaced === false) {
                        return (<td style={{color:'red'}}>Order not placed</td>);
                      }
                      else {
                        return (<td style={{color:'green'}}>Order placed</td>);
                      }
                    })}
                  </tr>
                </tbody> */}

                <thead>
                  <tr>      
                    <th>Retailer</th>
                    <th>Wholesaler</th>
                    <th>Distributor</th> 
                    <th>Factory</th>   
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Order not placed</td>
                    <td>Order placed</td>
                    <td>Order not placed</td>
                    <td>Order placed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {nextWeekBtn}
            
          </div>
          
          {/* -------SCREEN 4 ------- */}
          <div id="div4" className="quadrant">
            <h5>INVENTORY AND STATUS PLOTS - {role.roleName}</h5>
            <div className="plot-buttons">
              <button type="button" className="btn btn-primary" id="plot-btn">Inventory</button>
              <button type="button" className="btn btn-primary" id="plot-btn">Demand</button>
              <button type="button" className="btn btn-primary" id="plot-btn">Incoming Shipment</button>
              <button type="button" className="btn btn-primary" id="plot-btn">Outgoing Shimpent</button>
              <button type="button" className="btn btn-primary" id="plot-btn">Order</button>
              <button type="button" className="btn btn-primary" id="plot-btn">Plot All</button>
            </div>
            
            <div className="supply-chain-settings">
              <h5>SUPPLY CHAIN SETTINGS - {role.roleName}</h5>
              <table className="settings-table">
                <tbody>
                  <tr>
                    <td>Holding cost:</td>
                    <td id="val">{game.holding_cost}</td>
                  </tr>
                  <tr>
                    <td>Backorder cost:</td>
                    <td id="val">{game.backlog_cost}</td>
                  </tr>
                  <tr>
                    <td>Downstream Player:</td>
                    <td id="val">{role.downstreamPlayer}</td>
                  </tr>
                  <tr>
                    <td>Upstream Player:</td>
                    {/* Show role name instead */}
                    <td id="val">{role.upstreamPlayer}</td>
                  </tr>
                  <tr>
                    <td>Shipping Delay:</td>
                    <td id="val">{game.info_delay} weeks</td>
                  </tr>
                  <tr>
                    <td>Information Delay:</td>
                    <td id="val">{game.info_delay} weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
  else if (game.active === false) {
    return (<h5 style={{textAlign:'center', fontWeight:'400', color:'grey', padding:'50px'}}>Game not active</h5>);
  }
  else {
    return null;
  }
}

export default GameView;