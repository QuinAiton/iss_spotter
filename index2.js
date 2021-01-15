const { nextISSTimesForMyLocation } = require('./iss_promised');


// fetchMyApi()
//   .then(fetchCoordByIp)
//   .then(fetchFlyOverTime)
//   .then(body => console.log(body));
const PrintTimes = (passTimes) => {
  passTimes.forEach(element => {
    const { duration, risetime } = element;
    console.log(`next pass at ${new Date(risetime)} for ${duration} seconds`);
  });
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    PrintTimes(passTimes);
  })
  .catch((err) => {
    console.log(`something went wrong: ${err}`);
  });