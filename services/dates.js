/*jshint esversion: 6 */

const date = () => {
  let dateObject = new Date();
  let day = dateObject.getUTCDate();
  let month = dateObject.getUTCMonth();
  let year = dateObject.getUTCFullYear();
  let date = day + "." + (month + 1) + "." + year;

  return date;
};

module.exports = {
  getDate: date()
};
