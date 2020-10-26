import axios from 'axios'

const withHeaders = () => {
  return {
    headers: { 
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}
// let response = await fetch(url);
// if (response.ok) { // if HTTP-status is 200-299
//   // get the response body (the method explained below)
//   let json = await response.json();
// } else {
//   alert("HTTP-Error: " + response.status);
// }

// async componentDidMount() {
//   const response = await incidentData()
//   console.log(response)
// }

export const incidentData = async () => {
  try {
    const response = await fetch('/api/incidents')
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export const registerUser = async (registerData) => {
  try {
    const response = await fetch('/api/auth/register/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(registerData)
    }).then(response => {
      return response.json()
    })
    return response
  } catch (err){
    console.log(err)
  }
}

export const loginUser = async (formData) => {
  return axios.post('/api/auth/login/', formData)
}

export const profileUser = async () => {
  return axios.get('/api/auth/profile/', withHeaders())
}