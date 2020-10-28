
import { incidentSummary } from '../../lib/api'

export async function MapChartData() {

  // yearMonthFilter ending in 00 signifies a year, '2020-00' === '2020'

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

  const yearMonthFilter = '2020-01'
  if (yearMonthFilter.endsWith('00')){
    const year = yearMonthFilter.substring(0,4)
    console.log(year)
    const yearData = apiResponse.filter(item => {
      return item.yy_mm.startsWith(String(year))
    })
    console.log(yearData)
    return yearData
  } else {
    const month = yearMonthFilter.substring(5)
    console.log(month)
    const monthData = apiResponse.filter(item => {
      return item.yy_mm.substring(5,7) === String(month)
    })
    console.log(monthData)
    return monthData
  } 
}