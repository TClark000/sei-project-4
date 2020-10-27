import React, { useEffect } from 'react'
// error with bulmaCalendar component not in use
import bulmaCalendar from '~bulma-calendar/dist/js/bulma-calendar.min.js'
import '~bulma-calendar/dist/css/bulma-calendar.min.css'

const IncidentDate = ({ className }) => {

  useEffect(() => {
    // Initialize all input of date type.
    const calendars = bulmaCalendar.attach('[type="date"]', {})

    // Loop on each calendar initialized
    calendars.forEach((calendar) => {
    // Add listener to date:selected event
      calendar.on('date:selected', (date) => {
        console.log(date)
      })
    })

    // To access to bulmaCalendar instance of an element
    // eslint-disable-next-line no-undef
    const element = document.querySelector('#incidentDate')
    if (element) {
    // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', (datepicker) => {
        console.log(datepicker.data.value())
      })
    }
  }, [])

  return (
    <div className={className}>
      <p className="subtitle is-5">Date of Incident</p>
      <input 
        id="incidentDate" 
        type="date"
      />
    </div>
  )
}

export default IncidentDate