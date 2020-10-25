import React from 'react'

import IncidentGeoMap from '../incidents/IncidentGeoMap'

class Home extends React.Component {

  render () {

    return (
      <div>
        {/* <div style={{ height: '400px' }}> */}
        <div>
        Hello Home
          <IncidentGeoMap/>
        </div>
      </div>
    )
  }
}

export default Home