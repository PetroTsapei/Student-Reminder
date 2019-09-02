const moment = require('moment');

module.exports = Date.prototype.getWeekOfMonth = function() {
  let countMonths = moment(`${new Date().getFullYear()}-09-01`).diff(moment(new Date()), 'week');

  return countMonths || 1
};
