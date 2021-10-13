//Setting up am4map
let map = am4core.create("chartDiv", am4maps.MapChart);
map.geodata = am4geodata_worldLow;

am4core.useTheme(am4themes_animated);

map.projection = new am4maps.projections.Miller();

let polygonSeries = new am4maps.MapPolygonSeries();

polygonSeries.useGeodata = true;

let polygonTemplate = polygonSeries.mapPolygons.template;

polygonTemplate.tooltipText = "{name}";

polygonTemplate.polygon.fillOpacity = 0.6;

let hs = polygonTemplate.states.create("hover");

hs.properties.fill = map.colors.getIndex(0);

map.series.push(polygonSeries);

let imageSeries = map.series.push(new am4maps.MapImageSeries());
imageSeries.mapImages.template.propertyFields.longitude = "longitude";
imageSeries.mapImages.template.propertyFields.latitude = "latitude";
imageSeries.mapImages.template.tooltipText = "{title}";
imageSeries.mapImages.template.propertyFields.url = "url";

var colorSet = new am4core.ColorSet();

var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
circle.radius = 8;
circle.propertyFields.fill = "color";
circle.nonScaling = false;

const getActualPosition = async () => {
  return (await fetch("")).json();
};

const getActualPosition = async () => {
  return (await fetch("https://cors-anywhere.herokuapp.com/corsdemo/http://api.open-notify.org/iss-now.json")).json();
};

const getActualPeople = async () => {
  return (await fetch("https://cors-anywhere.herokuapp.com/corsdemo/http://api.open-notify.org/astros.json")).json();
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

  imageSeries.data = [
    {
      title: `🛰️${coord[0]},${coord[1]}`,
      latitude: coord[0],
      longitude: coord[1],
      color: "#ff650d",
    },
  ];
}, 2000);
