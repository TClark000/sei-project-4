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

export const incidentSingle = async(incidentId) => {
  return axios.get(`/api/incidents/${incidentId}`)
}

export const incidentSummary = async() => {
  return axios.get('/api/incidents/summary/')
}

export const incidentSubmit = async (submitData) => {
  return axios.post('/api/incidents/', submitData, withHeaders())
}

export const incidentUpdate = async(submitData, incidentId) => {
  return axios.put(`/api/incidents/${incidentId}/`, submitData, withHeaders())
}

export const incidentDelete = async(incidentId) => {
  return axios.delete(`/api/incidents/${incidentId}/`, withHeaders())
}

// classification

export const countryIndex = async () => {
  return axios.get('/api/classification/countries/')
}

export const attackClassIndex = async () => {
  return axios.get('/api/classification/attack_classes/')
}

export const attackTypeIndex = async () => {
  return axios.get('/api/classification/attack_types/')
}
export const targetClassesIndex = async () => {
  return axios.get('/api/classification/target_classes/')
}

// comments

export const commentCreate = async (submitData) => {
  return axios.post('/api/comments/', submitData, withHeaders())
}

export const commentDelete = async(commentId) => {
  return axios.delete(`/api/comments/${commentId}/`, withHeaders())
}