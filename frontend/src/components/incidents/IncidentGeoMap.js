import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'

import MapChart from '../map/MapChart'

const IncidentGeoMap = () => {
  const [content, setContent] = useState([])
  return (
    <div id='mapChart' className='container'>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip className="tooltip" multiline={true}>{content}</ReactTooltip>
    </div>
  )
}

export default IncidentGeoMap