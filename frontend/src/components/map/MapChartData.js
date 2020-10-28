
import { incidentSummary } from '../../lib/api'

// yearMonthFilter ending in 00 signifies a year, '2020-00' === '2020'
const yearMonthFilter = '2020-00'

export async function MapChartData() {

  const response = await incidentSummary().then(
    response => {
      return response.data
    }, 
    error => {
      console.error(error)
    }
  )
  const filteredData = MapChartDataFiltered(response)
  return filteredData
}

export async function MapChartDataFiltered(apiResponse){

  if (yearMonthFilter.endsWith('00')){
    const year = yearMonthFilter.substring(0,4)
    const yearData = apiResponse.filter(item => {
      return item.yy_mm.startsWith(String(year))
    })
    // console.log(yearData)
    return yearData
  } else {
    const monthData = apiResponse.filter(item => {
      return item.yy_mm.startsWith(String(yearMonthFilter))
    })
    // console.log(monthData)
    return monthData
  } 
}