var React = require('react');
var ReactDOM = require('react-dom');
var css = require('../style/main.scss');

var Main = require('./components/adminLTE/main.jsx');
var Login = require('./containers/loginContainer.jsx');
var Signup = require('./components/signup.jsx').Signup;
var VehicleRoutesContainer = require('./containers/vehicleRoutesContainer.jsx');

var Consumers = require('./components/consumers.jsx').ConsumersContainer;

var reducer = require('./reducers/reducer.js');
var Provider = require('react-redux').Provider;
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var combineReducers = require('redux').combineReducers;

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var thunk = require('redux-thunk');
var syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;


var vehicleRoutesActions = require('./actions/vehicleRoutesActions.js');

var store = createStore(reducer, applyMiddleware(thunk));

// Creates an enhanced history that syncs navigation events with the store
var history = syncHistoryWithStore(browserHistory, store)

var App = React.createClass({
  componentDidMount: function() {
    //when the app loads up, retrieve the vehicle routes
    store.dispatch(vehicleRoutesActions.fetch());
    //store.dispatch(actions.requestUser());

  },
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
});

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route component={Main}>
        <Route path="/routes" component={VehicleRoutesContainer}/>
        <Route path="/consumers" component={Consumers}/>
      </Route>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </Route>
  </Router>
</Provider>, document.getElementById('appView'));
