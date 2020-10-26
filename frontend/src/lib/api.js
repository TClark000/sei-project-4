// async componentDidMount() {
//   try {
//     const response = await fetch('/api/incidents')
//     const data = await response.json()
//     console.log(data)
//   } catch (err) {
//     console.log(err)
//   }
// }

// let response = await fetch(url);

// if (response.ok) { // if HTTP-status is 200-299
//   // get the response body (the method explained below)
//   let json = await response.json();
// } else {
//   alert("HTTP-Error: " + response.status);
// }

export const incidentData = async () => {
  try {
    const response = await fetch('/api/incidents')
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export const registerUser = async (formData) => {
  try {
    const response = await fetch('/api/auth/register/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(formData)
    }).then(response => {
      return response.json()
    })
    return response
  } catch (err){
    console.log(err)
  }
}