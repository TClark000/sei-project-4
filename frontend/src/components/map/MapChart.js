import React, { useEffect, useState } from 'react'

import { scaleLinear } from 'd3-scale'
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from 'react-simple-maps'

import { MapChartData } from './MapChartData'

import geoData from '../../lib/World-110mData.json'

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
  .domain([0.001, 0.040])
  .range(['#7fcdbb', '#081d58'])

const MapChart = ({ setTooltipContent } ) => {
  const [data, setData] = useState([])

  useEffect( async() => {
    const apiData = await MapChartData()
    setData(apiData)
  }, [])

  
  return (
    <ComposableMap 
      data-tip="" 
      projectionConfig={{
        rotate: [ -10, 0, 0],
        scale: 145
      }}>
      <Sphere stroke='#636363' strokeWidth={0.4} />
      <Graticule stroke='#636363' strokeWidth={0.4} />
      {data.length > 0 && (
        <Geographies geography={geoData}>
          {({ geographies }) => 
            geographies.map((geo) => {
              const d = data.find((s) => s.iso3 === geo.properties.ISO_A3)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties
                    {d && setTooltipContent(`${NAME} — pop: ${rounded(POP_EST)}, %_of_incidents: ${Number((d.percentage * 100).toFixed(1))}`)}
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('')
                  }}
                  fill={d ? colorScale(d['percentage']) : '#dce6d8'}
                  style={d ? {
                    hover: {
                      fill: '#d8d843',
                      outline: '#FFFFFF'
                    }
                  } : {
                    hover: {
                      fill: '#4c4c4c',
                      outline: 'FFFFFF'
                    }
                  }
                  }
                />
              )
            })}
        </Geographies>
      )}
    </ComposableMap>
  )
}

export default MapChart