const getActualPosition = async () => {
  return (await fetch("http://api.open-notify.org/iss-now.json")).json();
};

const getActualPeople = async () => {
  return (await fetch("http://api.open-notify.org/astros.json")).json();
};

const updateData = setInterval(async function () {
  let positionData = {};
  let peopleData = {};

  try {
    positionData = await getActualPosition();
    peopleData = await getActualPeople();
  } catch (err) {
    console.log(err);
  }

  let coord = [
    +positionData.iss_position.latitude,
    +positionData.iss_position.longitude,
  ];

  console.log(coord);
  console.log(peopleData.people[0].name);
}, 2000);
