import React, { useEffect, useState } from 'react'

// import { csv } from 'd3-fetch'
import { scaleLinear } from 'd3-scale'
import {
  // ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from 'react-simple-maps'

import dataJson from '../../lib/MapChartData'

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + 'Bn'
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + 'M'
  } else {
    return Math.round(num / 100) / 10 + 'K'
  }
}

const colorScale = scaleLinear()
  // .domain([0.29, 0.68])
  // set range for the low percentage range which excludes US from scale:
  .domain([0.001, 0.040])
  // .range(['#c6dbef', '#08306b'])
  .range(['#7fcdbb', '#081d58'])

// **** beginning of ***
const MapChart = ({ setTooltipContent } ) => {
  const [data, setData] = useState([])

  // csv sample data:
  // useEffect(() => {
  //   const importData = '/vulnerability_sample.csv'
  //   csv(importData).then((data) => {
  //     console.log(data)
  //     setData(data)
  //   })
  // }, [])

  useEffect(() => {
    console.log(dataJson)
    setData(dataJson)
  }, [])

  return (
    // <div>MapChart</div>
    <ComposableMap 
      data-tip="" 
      projectionConfig={{
        rotate: [ -10, 0, 0],
        // scale: 147
        scale: 120
      }}>
      <Sphere stroke='#636363' strokeWidth={0.4} />
      <Graticule stroke='#636363' strokeWidth={0.4} />
      {/* <ZoomableGroup> */}
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) => 
            geographies.map((geo) => {
              // lookup iso3 geo to match dataset cvs file details:
              // const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3)
              const d = dataJson.find((s) => s.iso3 === geo.properties.ISO_A3)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties
                    // setTooltipContent(`${NAME} — pop: ${rounded(POP_EST)}`)
                    {d && setTooltipContent(`${NAME} — pop: ${rounded(POP_EST)}, %_of_incidents: ${Number((d.percentage * 100).toFixed(1))}`)}
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('')
                  }}
                  // fill={d ? colorScale(d['2017']) : '#F5F4F6'}
                  fill={d ? colorScale(d['percentage']) : '#dce6d8'}
                  style={d ? {
                    hover: {
                      fill: 'd8d843',
                      outline: 'none'
                    }
                  } : {
                    hover: {
                      fill: '#4c4c4c',
                      outline: 'none'
                    }
                  }
                  }
                />
              )
            })}
        </Geographies>
      )}
      {/* </ZoomableGroup> */}
    </ComposableMap>
  )
}

export default MapChart