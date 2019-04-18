import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import { fillColor } from '../utils'
import tooltip from './Tooltip'
import { yearCenters } from '../constants';

//TODO: consider putting a forceCollide in here
//TODO: look up what charge does
export default class Bubbles extends React.Component {
  constructor(props) {
    super(props)
    const { forceStrength, center } = props
    this.simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(this.charge.bind(this)))
      .on('tick', this.ticked.bind(this))
      .stop()
  }

  state = {
    g: null,
  }

  componentWillReceiveProps(nextProps) {
    //console.log('this props', this.props)
    //console.log('nextProps: ', nextProps)
    if (nextProps.data !== this.props.data) {
      this.renderBubbles(nextProps.data)
      //console.log('different, call the renderBubbles()')
    }
  }

  shouldComponentUpdate() {
    // we will handle moving the nodes on our own with d3.js
    // make React ignore this component
    return false
  }

  onRef = (ref) => {
    //console.log('ref: ', ref)
    this.setState({ g: d3.select(ref) }, () => this.renderBubbles(this.props.data))
    //console.log('state', this.state)
  }

  ticked() {
    this.state.g.selectAll('.bubble')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  charge(d) {
    return -this.props.forceStrength * (d.radius ** 2.0)
  }

  renderBubbles(data) {
    //console.log('data', data)
    const bubbles = this.state.g.selectAll('.bubble').data(data, d => d.id)
    //console.log('bubbles: ', bubbles)

    // Exit
    bubbles.exit().remove()

    // Enter
    const bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => fillColor(d.group))
      .attr('stroke', d => d3.rgb(fillColor(d.group)).darker())
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)  // eslint-disable-line
      .on('mouseout', hideDetail) // eslint-disable-line

    //console.log('bubblesE', bubblesE)
    bubblesE.transition().duration(2000).attr('r', d => d.radius).on('end', () => {
      this.simulation.nodes(data)
      .alpha(1)
      .restart()
    })

    bubbles.transition().duration(100).attr('r', d => d.radius).on('end', () => {
      this.simulation.nodes(data)
      .alpha(.5)
      .restart()
    })
  }

  render() {
    return (
      <g ref={this.onRef} className="bubbles" />
    )
  }
}



/*
* Function called on mouseover to display the
* details of a bubble in the tooltip.
*/

//TODO: change the details to reflect my data
//Wins, Losses, Win %, Loss %, Total Games picked
//Color positive win % in light blue and negative in light red
export function showDetail(d) {
    // change outline to indicate hover state.
  d3.select(this).attr('stroke', 'black')

  const content = `<span class="name">Champion: </span><span class="value">${
                  d.name
                  }</span><br/>` +
                  `<span class="name">Picks: </span><span class="value">${
                  d.wins + d.losses
                  }</span><br/>` +
                  `<span class="name">Wins: </span><span class="value">${
                  d.wins
                  }</span><br/>` +
                  `<span class="name">Losses: </span><span class="value">${
                  d.losses
                  }</span>`
                  

  tooltip.showTooltip(content, d3.event)
}

/*
* Hides tooltip
*/
export function hideDetail(d) {
    // reset outline
  d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.group)).darker())

  tooltip.hideTooltip()
}
