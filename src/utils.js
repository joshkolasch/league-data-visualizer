import * as d3 from 'd3'
//const csvToJson = require('csvtojson')

/*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
export function createNodes(rawData) {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
  const maxAmount = d3.max(rawData, d => +d.total_amount)

    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
  const radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([2, 85])
      .domain([0, maxAmount])

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.

  //TODO: change the structure of each node
  const myNodes = rawData.map(d => ({
    id: d.id,
    radius: radiusScale(+d.total_amount),
    value: +d.total_amount,
    name: d.grant_title,
    org: d.organization,
    group: d.group,
    year: d.start_year,
    x: Math.random() * 900,
    y: Math.random() * 800,
  }))

    // sort them descending to prevent occlusion of smaller nodes.
  myNodes.sort((a, b) => b.value - a.value)

  return myNodes
}

/*
Node structure:

ID
Champion
Wins
Losses
Red Side
Blue Side
*/

export function myCreateNodes(data) {

  //const maxAmount = d3.max(data, d => +(d.wins + d.losses))
  const maxAmount = d3.max(data, d => +(d.picks))
  const radiusScale = d3.scalePow()
    .exponent(0.5)
    .range([0, 85])
    .domain([0, maxAmount])

  /*const myNodes = data.map(d => ({
    id: d.id,
    radius: radiusScale(+(d.wins + d.losses)),
    value: +(d.wins + d.losses),
    name: d.champion,
    wins: d.wins,
    losses: d.losses,
    redSide: d.redSide,
    blueSide: d.blueSide,
    group: selectGroup(d),
    x: Math.random() *900,
    y: Math.random() * 800,
  }))*/

  const myNodes = data.map(d => ({
    //id: d.id,
    radius: radiusScale(+(d.picks)),
    value: +(d.picks),
    name: d.champion,
    wins: d.wins,
    losses: d.picks - d.wins,
    redSide: d.redSide,
    blueSide: d.blueSide,
    group: selectGroup(d),
    x: Math.random() *900,
    y: Math.random() * 800,
  }))

  myNodes.sort((a, b) => b.value - a.value)

  return myNodes
}

/*export function fetchFakeData() {
  let fakeData = [
    {
      id: 1,
      champion: "Ashe",
      wins: 20,
      losses: 11,
      redSide: 15,
      bludSide: 16,
    },
    {
      id: 2,
      champion: "Anivia",
      wins: 0,
      losses: 0,
      redSide: 0,
      bludSide: 0,
    },
    {
      id: 3,
      champion: "Darius",
      wins: 2,
      losses: 5,
      redSide: 5,
      bludSide: 2,
    },
    {
      id: 4,
      champion: "Hecarim",
      wins: 20,
      losses: 20,
      redSide: 10,
      bludSide: 30,
    },
    {
      id: 5,
      champion: "Heimerdinger",
      wins: 5,
      losses: 10,
      redSide: 15,
      bludSide: 16,
    },
    {
      id: 6,
      champion: "Jarvin IV",
      wins: 12,
      losses: 35,
      redSide: 30,
      bludSide: 17,
    },
    {
      id: 7,
      champion: "Jax",
      wins: 20,
      losses: 20,
      redSide: 11,
      bludSide: 29,
    },
    {
      id: 8,
      champion: "Janna",
      wins: 2,
      losses: 11,
      redSide: 6,
      bludSide: 7,
    },
    {
      id: 9,
      champion: "Kai'sa",
      wins: 20,
      losses: 11,
      redSide: 15,
      bludSide: 16,
    },
    {
      id: 10,
      champion: "LeBlanc",
      wins: 20,
      losses: 11,
      redSide: 15,
      bludSide: 16,
    },
    {
      id: 11,
      champion: "Lissandra",
      wins: 20,
      losses: 11,
      redSide: 15,
      bludSide: 16,
    },
    {
      id: 12,
      champion: "Rek'Sai",
      wins: 20,
      losses: 11,
      redSide: 15,
      bludSide: 16,
    },
    {
      id: 13,
      champion: "Ryze",
      wins: 40,
      losses: 35,
      redSide: 55,
      bludSide: 20,
    },
    {
      id: 14,
      champion: "Tristana",
      wins: 20,
      losses: 15,
      redSide: 11,
      bludSide: 16,
    },
    {
      id: 15,
      champion: "Urgot",
      wins: 60,
      losses: 30,
      redSide: 45,
      bludSide: 45,
    },
  ]

  return fakeData
}*/

/*
export function fetchData(filepath) {
  csvToJson().fromFile('./data/league_test_data.csv').then(rows => {

    console.log('data read from csv', rows)
    return rows
  })
}
*/

export function selectGroup(datapoint) {
  let picks = datapoint.wins + datapoint.losses

  if(picks <= 0) {
    return 'low'
  }

  let winPercentage = datapoint.wins / picks

  if(winPercentage >= .6) {
    return 'high'
  }

  else if(winPercentage >= .5) {
    return 'medium'
  }

  return 'low'
}

export const fillColor = d3.scaleOrdinal().domain(['low', 'medium', 'high']).range(['#d84b2a', '#beccae', '#7CFC00'])
