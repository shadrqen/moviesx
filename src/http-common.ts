import axios, { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://jsonmock.hackerrank.com/api',
  headers: {
    'Content-type': 'application/json'
  }
})

export default apiClient
