'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var Message = require('../message.jsx');

const MINUTES_IN_HOUR = 60;
const MILES_IN_METER = 0.00062137;

var DirectionsBody = React.createClass({

  render:function(){
    var route = this.props.route;
    var maxPassengerDuration = Math.ceil(route.maxPassengerDuration/MINUTES_IN_HOUR);
    return(
      <div>
      <div><b>Max Passenger Duration (w/out stops and traffic) </b></div>
      <div>{maxPassengerDuration} minutes</div>
      {maxPassengerDuration > this.props.maxConsumerRouteTime?
        <Message message={{type:"info", msg:"The max passenger duration is greater than the maximum route time setting"}}/>
        :null
      }
      <div><b>Total Duration (w/out stops and traffic) </b></div>
      <div>{Math.ceil(route.totalDuration/MINUTES_IN_HOUR)} minutes</div>

      <div><b>Total Distance</b> </div>
      <div>{Math.ceil(route.totalDistance*MILES_IN_METER)} miles</div>
      {
        route.legs.map(function(leg, index){
          return(
            <div key={index}>
              <div> <b>{leg.start_location_name}</b></div>
              <div> {leg.start_address} </div>
              <p/>
              {
                leg.steps.map(function(step,index){
                  return(
                    <div key={index} dangerouslySetInnerHTML={{__html: step.html_instructions}}/>
                  )
                })
              }
              <p/>
              {index==route.legs.length-1?
                <div>
                <div> <b>{leg.end_location_name}</b></div>
                <div> {leg.end_address} </div>
                <p/>
                </div>
                :null
              }
            </div>
          )
        })
      }
      </div>
    )
  }
})

var mapStateToProps = function(state, ownProps){
  var route;
  if(ownProps.routeType=="PM"){
    route = state.directions.eveningRoute;
  }else{
    route = state.directions.morningRoute;
  }
  return {
    route : route,
    maxConsumerRouteTime: state.settings.maxConsumerRouteTime
  }
}
module.exports = connect(mapStateToProps)(DirectionsBody)
