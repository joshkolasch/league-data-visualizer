import React from 'react';
import QueryFilter from './QueryFilter'
import BubbleChart from './BubbleChart'
import MyBubbles from './MyBubbles'
import { center } from '../constants'

export default function Chart({ classes, width, height, onChanged, active, data, filter, filtered}) {
  console.log('data in chartjs', data)
  return (
    <div className={classes} width={width} height={height} >
      <QueryFilter onChanged={onChanged} active={active}/>
      <BubbleChart width={width} height={height}>
        <MyBubbles data={data} forceStrength={0.05} center={center} filter={filter} filtered={filtered} />
      </BubbleChart>
    </div>
  )
}