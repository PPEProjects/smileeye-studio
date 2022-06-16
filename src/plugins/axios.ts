import axios, { AxiosInstance } from 'axios'
import { App } from 'vue'
import { VueLoadingIndicatorInstance } from '@nguyenshort/vue3-loading-indicator'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

const plugin = {
  install(app: App) {
    const $loading: VueLoadingIndicatorInstance =
      app.config.globalProperties.$loading

    const http = axios.create({
      timeout: 10000
    })

    http.interceptors.request.use(
      (config) => {
        console.log('🔥 Request to:', config.url)
        $loading?.start()
        config.headers!['Authorization'] = 'Bearer '
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
        $loading?.finish()
        console.log('🌈 Response from:', response.config.url)
        return response.data
      },
      (error) => {
        const message = error.response.data.message || error.message
        console.log(message)
        $loading?.fail()
        return Promise.reject(error)
      }
    )

    app.provide<AxiosInstance>('$axios', http)
    app.config.globalProperties.$axios = http
  }
}

export default plugin
