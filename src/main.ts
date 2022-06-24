import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
// Cookie
import VueCookies from 'vue-cookies'

// Apollo
import apollo from './plugins/apollo/index'
// request axios
import http from './plugins/axios'

// Router
import router from './routes'

// Animation
import animejs from './plugins/animejs'
import VueLottie from '@nguyenshort/vue-lottie'

// Pinna store
import { createPinia } from 'pinia'
const pinia = createPinia()

// Dayjs
import dayjs from './plugins/dayjs'

// Mounted Teleport
import cropper from './plugins/cropper'
// import draggable from "./plugins/draggable"

// Meta SEO
import { createHead } from '@vueuse/head'
const head = createHead()

// Infinitie Loading
import infinite from '@plugins/eternal-loading'

// Đa Ngôn Ngữ
import i18n from '@plugins/i18n'

// Event bus
import VueMitter from '@nguyenshort/vue3-mitt'

// CDN Plugin
import ultils from '@plugins/ultils'
import VueLoadingIndicator from '@nguyenshort/vue3-loading-indicator'
import firebase from '@plugins/firebase'

// Process by me

// Init app
const app = createApp(App)

app.use(VueLoadingIndicator, {
  autoFinish: true,
  stepGap: 100
})

app.use(ultils)
app.use(VueMitter)
app.use(animejs)
app.use(VueLottie)
app.use(VueCookies)
app.use(dayjs)
app.use(cropper)
app.use(infinite)
app.use(i18n)
app.use(head)

app.use(firebase)
app.use(http)
app.use(pinia)

app.use(apollo)

app.use(router)

app.mount('#app')

window.$vue = app

export default app
