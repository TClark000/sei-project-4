import React from 'react'

import IncidentGeoMap from '../incidents/IncidentGeoMap'

class Home extends React.Component {

  render () {

    return (
      <div>
        <div id='mapChartTitle' className='container has-text-centered title is-2'>Cyber Incidents - percentage of reported incidents per country in August 2020
          <IncidentGeoMap/>
        </div>
      </div>
    )
  }
}

export default Home