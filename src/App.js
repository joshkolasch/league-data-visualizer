import React from 'react'
import * as d3 from 'd3'
import './App.css'
import BubbleChart from './components/BubbleChart'
import Bubbles from './components/Bubbles'
import MyBubbles from './components/MyBubbles'
//DONE: remove YearsTitles component
//import YearsTitles from './components/YearsTitles'
//TODO: change GroupingPicker component to queryFilter
import QueryFilter from './components/QueryFilter'
import GroupingPicker from './components/GroupingPicker'
import { createNodes, myCreateNodes, fetchFakeData } from './utils'
import { width, height, center, yearCenters, leftCenter, rightCenter } from './constants'
import Chart from './components/Chart'
//import csv from 'csvtojson'

//DONE: change grouping to queryFilter and 'all'
//TODO: remove grouping from state
export default class App extends React.Component {
  state = {
    chartOneData: [],
    chartTwoData: [],
    filter: 'none',
    chartOneFilters: {
      region: 'none',
      patch: 'none',
      position: 'none'
    },
    chartTwoFilters: {
      region: 'none',
      patch: 'none',
      position: 'none'
    },
  }

  //TODO: replace 'data/fakeData.json' with json data from an async API call function
  //Note: on componentDidMount(), the data defaults to All Leagues for the entirety of Spring 2019
  componentDidMount() {

  /*const filePath = './league-test-data.csv'
  csv().fromFile(filePath)
    .then((jsonObj) => {
      console.log(jsonObj)
    })*/


    //console.log(results)

    d3.json('data/fakeData.json', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      this.setState({
        chartOneData: myCreateNodes(data),
        chartTwoData: myCreateNodes(data.filter(i => i.id %2 === 0))
      })
    })
  }

  //DONE: change this to onQueryFilterChanged
  

  //TODO: reduce both onChange events into a single event
  onChartOneFilterChanged = (newFilter) => {
    console.log('filter One changed', newFilter)
    let key = Object.keys(newFilter)[0]
    let value = newFilter[key]

    this.setState({
      chartOneFilters: {
        ...(this.state.chartOneFilters),
        [key]: value
      }
    }, () => (console.log('new new state', this.state)))
    //TODO: replace anonymous function above with an api call to change the query parameters
  }

  onChartTwoFilterChanged = (newFilter) => {
    console.log('filter Two changed', newFilter)
    let key = Object.keys(newFilter)[0]
    let value = newFilter[key]

    console.log('key', key)
    console.log('value', value)

    this.setState({
      chartTwoFilters: {
        ...(this.state.chartTwoFilters),
        [key]: value
      }
    }, () => (console.log('new new state', this.state)))
  }

  //TODO: do I still need the 'filter' variable and the 'active' variable???
  render() {
    const { chartOneData, chartTwoData, filter, chartOneFilters, chartTwoFilters } = this.state

    let filteredData;
    let filtered;
    //console.log('filter: -->', filter)
    /*if(filter === 'filterOne') {
      filteredData = data.filter(d => d.value > 10000000)
      filtered === true
      //console.log('filteredData:', filteredData)
    }*/
    return (
      <div className="App">
        <div className="chart-holder">
          <Chart classes="chart left" onChanged={this.onChartOneFilterChanged} active={filter} width={width} height={height} data={chartOneData} center={center} filter={filter} filtered={chartOneFilters}/>
          <Chart classes="chart right" onChanged={this.onChartTwoFilterChanged} active={filter} width={width} height={height} data={chartTwoData} center={center} filter={filter} filtered={chartTwoFilters}/>
        </div>
      </div>
    )
  }

}
