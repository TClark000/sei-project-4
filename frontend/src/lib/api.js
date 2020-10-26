// async componentDidMount() {
//   try {
//     const response = await fetch('/api/incidents')
//     const data = await response.json()
//     console.log(data)
//   } catch (err) {
//     console.log(err)
//   }
// }

export const incidentData = async () => {
  try {
    const response = await fetch('/api/incidents')
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export const registerUser = async () => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 'formData': 'formData' })
    })
    // .then(response => {
    //   return response.json()
    // })
    console.log(response.json())
    return await response.json()
    
  } catch (err){
    console.log(err)
  }
}
