const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyApi = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) {
      callback(err, null);
    }
    if (response.statusCode !== 200) {
      const message = `status code ${response.statusCode} when fetching IP. response: ${body}`;
      callback(Error(message), null);
      return;
    }
    callback(null, JSON.parse(body));
  });
};

const fetchCoordByIp = (ip, callback) => {
  request('https://freegeoip.app/json/' + ip, (err, response, body) => {
    if (err) {
      callback(err, null);
    }
    if (response.statusCode !== 200) {
      const message = `status code ${response.statusCode} when fetching IP. response: ${body}`;
      callback(Error(message));
      return;
    }
    callback(null, JSON.parse(body));
  });
};
const fetchFlyOverTime = (geoLocation, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${geoLocation.lat}&lon=${geoLocation.long}`, (err, response, body) => {
    if (err) {
      callback(err, null);
    }
    if (response.statusCode !== 200) {
      const message = `status code ${response.statusCode} when fetching IP. response: ${body}`;
      callback(Error(message));
      return;
    }
    callback(null, JSON.parse(body));
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyApi((err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    const ip = data.ip;
    fetchCoordByIp(ip, (err, data) => {
      if (err) {
        callback(err, null);
        return;
      }
      const geoLocation = {
        lat: data.latitude,
        long: data.longitude
      };
      fetchFlyOverTime(geoLocation, (err, data) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, data);

      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };