'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Directions = new Schema({
  v_id: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: 'Vehicle',
  },
  origin_address:String,
  destination_address:String,
  waypoints:[{
    name:String,
    address:String
  }],
  morningRoute: mongoose.Schema.Types.Mixed,
  eveningRoute: mongoose.Schema.Types.Mixed

});

module.exports = mongoose.model('Directions', Directions);