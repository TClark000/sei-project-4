import axios from 'axios'

const withHeaders = () => {
  return {
    headers: { 
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}

// auth

export const registerUser = registerData => {
  return axios.post('/api/auth/register/', registerData)
}

export const loginUser = async (formData) => {
  return axios.post('/api/auth/login/', formData)
}

export const profileUser = async () => {
  return axios.get('/api/auth/profile/', withHeaders())
}

// incident

export const incidentData = async () => {
  try {
    const response = await fetch('/api/incidents')
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export const incidentSubmit = async (submitData) => {
  return axios.post('/api/incidents/', submitData, withHeaders())
}

// classification

export const countryIndex = async () => {
  return axios.get('/api/classification/countries')
}

export const attackClassIndex = async () => {
  return axios.get('/api/classification/attack_classes')
}

export const attackTargetIndex = async () => {
  return axios.get('/api/classification/attack_types')
}
export const targetClassesIndex = async () => {
  return axios.get('/api/classification/target_classes')
}