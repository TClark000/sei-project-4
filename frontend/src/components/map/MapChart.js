import React, { useEffect, useState } from 'react'

import { csv } from 'd3-fetch'
import { scaleLinear } from 'd3-scale'
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from 'react-simple-maps'

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
  .domain([0.29, 0.68])
  .range(['#c6dbef', '#08306b'])

// **** beginning of ***
const MapChart = ({ setTooltipContent } ) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const newLocal = '/vulnerability_sample.csv'
    csv(newLocal).then((data) => {
      console.log(data)
      setData(data)
    })
  }, [])

  return (
    // <div>MapChart</div>
    <ComposableMap 
      data-tip="" 
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}>
      <Sphere stroke='#E4E5E6' strokeWidth={0.5} />
      <Graticule stroke='#E4E5E6' strokeWidth={0.5} />
      <ZoomableGroup>
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) => 
              geographies.map((geo) => {
                // lookup iso3 geo to match dataset
                const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME, POP_EST } = geo.properties
                      setTooltipContent(`${NAME} — pop: ${rounded(POP_EST)}`)
                      console.log(setTooltipContent)
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('')
                      console.log(setTooltipContent)
                    }}
                    fill={d ? colorScale(d['2017']) : '#F5F4F6'}
                    style={d ? {
                      hover: {
                        fill: '#7c8af2',
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
      </ZoomableGroup>
    </ComposableMap>
  )
}

export default MapChart