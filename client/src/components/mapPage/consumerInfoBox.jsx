var React = require('react');
var actions = require('../../actions/mapActions')
var connect = require('react-redux').connect;

var _addFlags = require('../../utils/addConsumerFlags');

var ConsumerInfoBox = React.createClass({
    render: function() {
    var consumer = this.props.consumers[this.props.consumerId];
    var flags = _addFlags(consumer);
    var createMarkup = function(s) {return {__html: s}}
    var flagsSpan = flags.needs
      ? (
        <span
          className="pull-right"
          dangerouslySetInnerHTML={createMarkup(flags.flagsString)}
        />
      ) : null;
    return (
    <div>
      <span>
        <i
          className="fa fa-times cust-btn"
          onClick={
            this.props.removeConsumerFromActiveBus
            .bind(
              null,
              this.props.consumerId,
              this.props.activeVehicleId
            )}
        ></i>
        &nbsp;
        {consumer.name}
      </span>
      {flagsSpan}
    </div>
  )}
})

var mapStateToProps = function(state){
  return {
    activeVehicleId : state.mapPage.activeVehicleId,
    consumers: state.consumers.data
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    removeConsumerFromActiveBus: function(c_id, active_v_id) {
      dispatch(actions.removeFromActiveBus(c_id, active_v_id))
    }
  }
}

var CIBContainer = connect(mapStateToProps, mapDispatchToProps)(ConsumerInfoBox);

module.exports = CIBContainer;
