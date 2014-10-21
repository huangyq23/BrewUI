/*
 * Log store
 *
 * @module LogStore
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var LogConstants = require('../constants/LogConstants');

/*
 * Log store
 *
 * @constructor LogStore
 * @param {Object} dispatcher
 */
function LogStore() {
  this.brewLogs = [];
  this.selectedBrewLog = null;
}

// Configure store
LogStore.storeName = 'LogStore';
LogStore.handlers = {};
LogStore.handlers[LogConstants.ActionTypes.FIND_LOG_SUCCESS] = 'handleBrewLogs';


// Inherit ApplicationStore from the EventEmitter
util.inherits(LogStore, EventEmitter);


/*
 * Get state
 *
 * @method getState
 * @return {Object} state
 */
LogStore.prototype.getState = function () {
  return {
    brewLogs: this.brewLogs,
    selectedBrewLog: this.selectedBrewLog
  };
};


/*
 * Dehydrate
 *
 * @method dehydrate
 * @return {Object} state
 */
LogStore.prototype.dehydrate = function () {
  return this.getState();
};


/*
 * Rehydrate
 *
 * @method rehydrate
 * @param {Object} state
 */
LogStore.prototype.rehydrate = function (state) {
  this.brewLogs = state.brewLogs;
  this.selectedBrewLog = state.selectedBrewLog;
};


/*
 * Handle brew logs
 *
 * @method handleBrewLogs
 * @param {Object} brew
 */
LogStore.prototype.handleBrewLogs = function (logs) {
  this.brewLogs = logs;

  this.emit('change');
};


module.exports = LogStore;
