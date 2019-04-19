import React, { PropTypes } from 'react'
import './GroupingPicker.css'
import { regions, patches, positions } from '../constants'


export default class QueryFilter extends React.Component {
  state = {
    regionValue: 'none',
    patchValue: 'none',
    positionValue: 'none',
  }
  
  onSelectChanged = (event) => {
    console.log('trying to change selection', event.target)
    this.props.onChanged(event.target.value)
  }

  onRegionChanged = (event) => {
    this.setState({
      regionValue: event.target.value
    }, () => console.log('onRegionChanged', this.state.regionValue))
    this.props.onChanged({league: event.target.value})
  }

  onPatchChanged = (event) => {
    this.props.onChanged({patchno: event.target.value})
    this.setState({
      patchValue: event.target.value
    }, () => console.log('onPatchChanged', this.state.patchValue))
  }

  onPositionChanged = (event) => {
    this.props.onChanged({position: event.target.value})
    this.setState({
      positionValue: event.target.value
    }, () => console.log('onPositionChanged', this.state.positionValue))
  }
  
  render() {
    const { active } = this.props


    //TODO: set each style to something like:
    //style={highlighted && ${active === 'none'}}
    //style={highlighted && ${active === 'filterOne'}}
    /*let defaultOption = <option key="default" value="none">Select</option>
    let option1 = <option key="item-1" value="filterOne">One</option>
    let option2 = <option key="item-2" value="filterTwo">Two</option>
    let option3 = <option key="item-3" value="filterTwo">Three</option>*/

    let regionOptions = regions.map((region, i) => (
      <option key={'region-option-' + i} value={region}>{region}</option>
    ))

    let patchOptions = patches.map((patch, i) => (
      <option key={'patch-option-' + i} value={patch}>{patch}</option>
    ))

    let positionOptions = positions.map((position, i) => (
      <option key={'position-option-' + i} value={position}>{position}</option>
    ))

    return (
      /*<div className="QueryFilter" onChange={this.onSelectChanged} value={active}>*/
      <div className="QueryFilter">
        {/*<select className="filter-one">
          {defaultOption}
          {option1}
          {option2}
          {option3}
    </select> */}
        <select className='filter-dropdown region-dropdown' onChange={this.onRegionChanged} value={this.state.regionValue}>
          <option key='region-default' value='none'>Filter by Region</option>
          {regionOptions}
        </select>
        <select className='filter-dropdown patch-dropdown' onChange={this.onPatchChanged} value={this.state.patchValue}>
          <option key='patch-default' value='none'>Filter by Patch</option>
          {patchOptions}
        </select>
        <select className='filter-dropdown position-dropdown' onChange={this.onPositionChanged} value={this.state.positionValue}>
          <option key='position-default' value='none'>Filter by Position</option>
          {positionOptions}
        </select>
        
      </div>
    )
  }
}

QueryFilter.propTypes = {
  onChanged: PropTypes.func.isRequired,
}
