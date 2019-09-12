const moment = require('moment');

module.exports = Date.prototype.getWeekOfMonth = function() {
  let countMonths = moment(new Date()).diff(moment(`${this.getFullYear()}-09-01`), 'week');

  return (countMonths + 1) % 4
};
