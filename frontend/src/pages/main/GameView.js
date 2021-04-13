import React, { useEffect, useState } from 'react';
import '../../css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import TimelineIcon from '@material-ui/icons/Timeline';
import SharedInfo from '../components/lists/SharedInfo';
import WeeksInfo from '../components/lists/WeeksInfo';
import InventoryPlot from '../components/plots/game/InventoryPlot';
import DemandPlot from '../components/plots/game/DemandPlot';
import IncShipPlot from '../components/plots/game/IncShipPlot';
import OutShipPlot from '../components/plots/game/OutShipPlot';
import OrderPlot from '../components/plots/game/OrderPlot';
import PlotAll from '../components/plots/game/PlotAll';
import crate from '../components/img/crate.png'

/**
 * Game display page 
 *
 * @component
 * @param {string} gameid id of game passed as parameter in dynamic link
 */
function GameView() {
  const { gameid } = useParams();

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
  });

  const [week, setWeekSettings] = useState({
    id: '',
    number: '',
    inventory: '',
    backlog: '',
    demand: '',
    incoming_shipment: '',
    outgoing_shipment: '',
    order_placed: '',
    cost: '',
    associatedRole: '',
  });

  const [role, setRoleSettings] = useState({
    id: '',
    roleName: null,
    associatedGame: '',
    downstreamPlayer: '',
    upstreamPlayer: '',
  });

  const [orderBeer, setOrder] = useState({
    quantity: null,
  });

  const [upstreamRole, setUpstream] = useState({
    roleName: '',
  });

  const [downstreamRole, setDownstream] = useState({
    roleName: '',
  });

  const [ordersStatus, setOrdersStatus] = useState({
    status: false,
  })

  useEffect(() => {
    // Geting and setting game data
    axiosInstance.get(`http://127.0.0.1:8000/api/game/${gameid}`)
    .then((res) => {
      setGameSettings(s => ({
        // active: true,
        active: res.data.active,
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
      // console.log(res.data);
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
      axiosInstance.get('http://127.0.0.1:8000/api/role/')
      .then((res) => {
        // console.log(res.data);
        const allRoles = res.data;

        for (var i = 0; i < allRoles.length; i++) {
          if (parseInt(gameid) === allRoles[i].associatedGame) {
            const rid = allRoles[i].id;
            axiosInstance.get(`http://127.0.0.1:8000/api/role/${rid}/`)
            .then((res) => {
              // console.log(res.data);
              setRoleSettings(s => ({
                id: res.data.id,
                roleName: res.data.roleName,
                associatedGame: res.data.associatedGame,
                downstreamPlayer: res.data.downstreamPlayer,
                upstreamPlayer: res.data.upstreamPlayer,
              }));

              // Getting and setting upstream player
              if (res.data.roleName === "Factory") {
                setUpstream(s => ({
                  roleName: "Brewry",
                }));
              }
              else {
                axiosInstance.get(`http://127.0.0.1:8000/api/role/${res.data.upstreamPlayer}/`)
                .then((res1) => {
                  // console.log(res.data);
                  setUpstream(s => ({
                    roleName: res1.data.roleName,
                  }));
                })
                .catch(error => {if(error.response){console.log(error.response.data);}});
              }

              // Gettign and setting downstream player
              if (res.data.roleName === "Retailer") {
                setDownstream(s => ({
                  roleName: "Customer",
                }));
              }
              else {
                axiosInstance.get(`http://127.0.0.1:8000/api/role/${res.data.downstreamPlayer}/`)
                .then((res2) => {
                  // console.log(res.data);
                  setDownstream(s => ({
                    roleName: res2.data.roleName,
                  }));
                })
                .catch(error => {if(error.response){console.log(error.response.data);}});
              }
            })
            .catch(error => {if(error.response){console.log(error.response.data);}});

            // Getting and setting current week data
            axiosInstance.get(`http://127.0.0.1:8000/api/role/${rid}/getweek/`)
            .then((res) => {
              // console.log(res.data);
              for (var i = 0; i < res.data.length; i++) {
                const data = res.data[i];
                if (game.rounds_completed === i) {
                  setWeekSettings(s => ({
                    id: data.id,
                    number: data.number,
                    inventory: data.inventory,
                    backlog: data.backlog,
                    demand: data.demand,
                    incoming_shipment: data.incoming_shipment,
                    outgoing_shipment: data.outgoing_shipment,
                    order_placed: data.order_placed,
                    cost: data.cost,
                    associatedRole: data.associatedRole,
                  }));
                }
              }
            })
            .catch(error => {if(error.response){console.log(error.response.data);}});

            // Getting next round ready status
            axiosInstance.get(`http://127.0.0.1:8000/api/role/${rid}/nextroundstatus/`)
            .catch(error => {
              if (error.response) {
                console.log(error.response);
              }
              else {
                setOrdersStatus(s => ({
                  status: true,
                }));
              }
            });

          }
        }
      }).catch(error => {if(error.response){console.log(error.response.data);}}); 
    } 
  }, [setGameSettings, setWeekSettings, setRoleSettings, gameid, game.rounds_completed, role.upstreamPlayer, role.id, game.active]);

  // Order input changed
  const onOrderChange = (e) => {
    setOrder({quantity: e.target.value});
    console.log(orderBeer.quantity);  
  }

  // Submitting order
  const submitOrder = (e) => {
    e.preventDefault();
    axiosInstance.post(`http://127.0.0.1:8000/api/role/${role.id}/orderbeer/`, orderBeer)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("Successfully ordered " + orderBeer.quantity + " beers!");
        window.location = `/gameview/${gameid}`;
      }
    })
    .catch(error => {
      if(error.response){ 
        alert("Couldn't submit order.");
        console.log(error.response.data);
      }
    });
  }

  // Checking if current player has submitted order
  const orderIsPlaced = (
    (week.order_placed === null && game.is_completed === false) ?
    <>
      <div className="my-3">Place your order: </div>
      <form className="form-inline justify-content-center" onSubmit={submitOrder}>
        <div className="form-group mx-sm-3 mb-2">
          <input type="number" name="order_placed" id="order_placed" className="form-control text-center" onChange={onOrderChange} required/>
        </div>
        <input type="submit" className="btn btn-primary mb-2"/>
      </form>
    </> : 
    (week.order_placed != null && game.is_completed === false) ? 
    <div className="order-is-placed">
      Your order is: <b>{week.order_placed}</b> <br/>
      Your shipment is: <b>{week.incoming_shipment}</b><br/>
      Inventory at week {week.number}: <b>{week.inventory}</b> <br/>
      Current cost: <b>{week.cost}</b> <br/>
      <p>Please wait until all orders have been placed to proceed to the next week.</p>
    </div> : 
    (game.is_completed === true) ?
    <>
      <h3>Game completed! Click on the button to view Game Insights:</h3>
      <a href={`/insights/${gameid}`} type="button" className="btn btn-secondary">Game Insights <TimelineIcon/></a>
    </> : null
  );

  // Checking if all orders have been placed
  const nextWeekBtn = (
    (ordersStatus.status === true) ?
    <div className="all-orders-placed">
      <p>All orders have been placed for week {week.number}. You can now proceed to next week.</p>
      {/* <a href={`/game/${gameid}/${weekid}`} type="button" className="btn btn-success">Next Week</a> */}
      <a href={`/gameview/${gameid}`} type="button" className="btn btn-success">Next Week <NavigateNextIcon/></a>
    </div> : null
  );

  // Displaying gameview only if game is active
  if (game.active === true) {
    if (role.roleName === null) {
      return (
        <>
          <h5 style={{textAlign:'center', fontWeight:'400', color:'grey', padding:'50px'}}>You're not registered for this game</h5>
          <div style={{textAlign: 'center'}}><a href="/join"><ArrowBackIcon/>Back to Games List</a><br/></div>
        </>
      );
    }
    else {
      return (
        <div>
          {/* -------SCREEN 1 ------- */}
          <div id="div1" className="quadrant">
          <div style={{width: '100%', textAlign: 'left'}}><a href="/join"><ArrowBackIcon/>Back to Joined Games</a><br/></div>

            {/* Get week number from week instead */}
            <h5 style={{color:'#214da3'}}>{role.roleName} - GAME {gameid} - WEEK {week.number}</h5>
            <h5>INPUT SCREEN</h5>
            
            <div className="table-cont">
              <table className="table-input-screen">
                <tbody>
                  <tr>
                    <td style={{textAlign:'right'}}>Demand from {downstreamRole.roleName}:</td>
                    <td className="value" id="demand">{week.demand}</td>
                    <td style={{textAlign:'right'}}>Beginning Inventory:</td>
                    <td className="value" id="inventory">{week.inventory}</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid grey'}}>
                    <td style={{textAlign:'right'}}>Backorder:</td>
                    <td className="value" id="backlog" style={{color:'red'}}>{week.backlog}</td>
                    <td style={{textAlign:'right'}}>Incoming Shipment:</td>
                    <td className="value" id="incoming_shipment" style={{color:'green'}}>{week.incoming_shipment}</td>
                  </tr>
                  <tr>
                    <td style={{textAlign:'right'}}>Total Requirements:</td>
                    <td className="value" id="total_requirements" style={{color:'blue'}}>{week.demand + week.backlog}</td>
                    <td style={{textAlign:'right'}}>Total Available:</td>
                    <td className="value" id="total_available" style={{color:'blue'}}>{week.inventory + week.incoming_shipment}</td>
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

              <WeeksInfo gameid={gameid}/>
              
            </div>
          </div>

          {/* -------SCREEN 3 ------- */}
          <div id="div3" className="quadrant">
            <h5>STATUS OF OTHER SUPPLY CHAIN MEMBERS - WEEK {week.number}</h5>
            <div className="order-status">
              <p>Once all players have placed an order, you can proceed to next week.</p>

              <SharedInfo roleid={role.id}/>
              
            </div>

            <img src={crate} alt="Beer" className="beer-img"/>

            {nextWeekBtn}
            
          </div>
          
          {/* -------SCREEN 4 ------- */}
          <div id="div4" className="quadrant">
            <h5>INVENTORY AND STATUS PLOTS - {role.roleName}</h5>
            <div className="plot-buttons">
              <div style={{display:'flex', justifyContent:'center'}}>
                <InventoryPlot gameid={gameid}/>
                <DemandPlot gameid={gameid}/>
                <IncShipPlot gameid={gameid}/>
                <OutShipPlot gameid={gameid}/>
                <OrderPlot gameid={gameid}/>
                <PlotAll gameid={gameid}/>
              </div>
              
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
                    <td id="val">{downstreamRole.roleName}</td>
                  </tr>
                  <tr>
                    <td>Upstream Player:</td>
                    {/* Show role name instead */}
                    <td id="val">{upstreamRole.roleName}</td>
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