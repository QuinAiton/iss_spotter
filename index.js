// const { fetchMyApi, fetchCoordByIp, fetchFlyOverTime } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


const PrintTimes = (passTimes) => {
  passTimes.forEach(element => {
    const { duration, risetime } = element;
    console.log(`next pass at ${new Date(risetime)} for ${duration} seconds`);
  });
};

nextISSTimesForMyLocation((err, passTimes) => {
  if (err) return console.log('Error! cannot locate', err);
  const { response } = passTimes;
  PrintTimes(response);
});