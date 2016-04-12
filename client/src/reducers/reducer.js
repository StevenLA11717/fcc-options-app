var vehicleRoutes =require('./vehicleRoutesReducer');
var vehicles =require('./vehicleReducer');
var vehiclesPage =require('./vehiclePageReducer');
var consumersForm = require('./consumerFormReducer');
var settingsForm = require('./settingsFormReducer');
var loginForm = require('./loginFormReducer');
var auth = require('./authReducer');
var routerReducer = require('react-router-redux').routerReducer;
var mapPage = require('./mapReducer')

var settings = require('./settingsReducer');
var consumers = require('./consumerReducer');
var directions = require('./directionsReducer');

var combineReducers = require('redux').combineReducers;

var rootReducer = combineReducers({
  // UI states
  settingsForm:settingsForm,
  consumersForm: consumersForm,
  vehiclesPage: vehiclesPage,
  routing: routerReducer,
  vehicleRoutes: vehicleRoutes,
  mapPage: mapPage,
  loginForm: loginForm,

  // data state
  auth:auth,
  settings:settings,
  consumers: consumers,
  vehicles: vehicles,
  directions:directions

});
module.exports = rootReducer;
