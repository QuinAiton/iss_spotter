const request = require('request-promise-native');

const fetchMyApi = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordByIp = (body) => {
  let IP = JSON.parse(body).ip;
  return request('https://freegeoip.app/json/' + IP);
};
const fetchFlyOverTime = (body) => {
  let Coords = JSON.parse(body);
  const { latitude: lat, longitude: long } = Coords;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`);
};


const nextISSTimesForMyLocation = () => {
  return fetchMyApi()
    .then(fetchCoordByIp)
    .then(fetchFlyOverTime)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};
module.exports = { nextISSTimesForMyLocation };