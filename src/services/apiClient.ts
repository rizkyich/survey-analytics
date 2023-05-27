import axios, { InternalAxiosRequestConfig } from 'axios'

import { BASE_URL } from '../config'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

const processRequest = async (config: InternalAxiosRequestConfig) => {
  const userInfo: any = JSON.parse(window.localStorage.getItem('user') || '{}')
  let configObj: any = {}

  if (userInfo?.token) {
    configObj = {
      ...config,
      headers: {
        ...config.headers,
        authorization: `${userInfo.tokenType} ${userInfo.token}`,
      },
    }
  }

  return configObj
}

apiClient.interceptors.request.use(processRequest, (error) =>
  Promise.reject(error)
)

export default apiClient
