
import { incidentSummary } from '../../lib/api'

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

  // yearMonthFilter ending in 00 signifies a year, '2020-00' === '2020'
  const yearMonthFilter = '2020-00'

  if (yearMonthFilter.endsWith('00')){
    const year = yearMonthFilter.substring(0,4)
    const yearData = apiResponse.filter(item => {
      return item.yy_mm.startsWith(String(year))
    })
    const yearTotal = yearData.reduce((total, current) => {
      return total + Number(current.monthly_count)
    }, 0 )
    const countryPercentage  = yearData.reduce((countries, country) => {
      countries[country.country] = {
        country: country.country,
        iso2: country.iso2,
        iso3: country.iso3,
        percentage: (country.country in countries ? Number(countries[country.country].percentage) : 0) + Number(country.monthly_count) / yearTotal 
      }
      return countries
    }, [])
    return Object.values(countryPercentage)
  } else {
    const monthData = apiResponse.filter(item => {
      return item.yy_mm.startsWith(String(yearMonthFilter))
    })
    return monthData
  } 
}