import axios, { AxiosInstance } from 'axios'
import { App } from 'vue'
import app from '../main'

const http = axios.create({
  baseURL: import.meta.env.VITE_SMILE_EYE_SERVER,
  timeout: 10000
})

http.interceptors.request.use(
  (config) => {
    app.config.globalProperties.$Progress?.start()
    console.log('🔥 Request to:', config.url)
    // @ts-ignore
    config.headers['Authorization'] = 'Bearer '
    return config
  },
  (error) => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// service.interceptors.http
http.interceptors.response.use(
  (response) => {
    // if (response.headers.authorization) {
    //   setToken(response.headers.authorization)
    //   response.data.token = response.headers.authorization
    // }
    console.log('🌈 Response from:', response.config.url)
    app.config.globalProperties.$Progress?.finish()
    return response.data
  },
  (error) => {
    const message = error.response.data.message || error.message
    console.log(message)
    app.config.globalProperties.$Progress?.fail()
    return Promise.reject(error)
  }
)

const plugin = {
  install(app: App) {
    app.provide<AxiosInstance>('http', http)
  }
}

export default plugin
