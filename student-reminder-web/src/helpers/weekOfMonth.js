module.exports = Date.prototype.getWeekOfMonth = function() {
  let firstWeekday = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
  let offsetDate = this.getDate() + firstWeekday - 1;
  return Math.floor(offsetDate / 7);
};