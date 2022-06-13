import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import './assets/less/ant.less'

import Antd from 'ant-design-vue'

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
import teleport from './plugins/teleport'
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
import mitter from '@plugins/emitter'

// CDN Plugin
import cdn from '@plugins/ultils'

const app = createApp(App)

app.use(cdn)
app.use(mitter)
app.use(Antd)
app.use(animejs)
app.use(VueLottie)
app.use(VueCookies)
app.use(teleport)
app.use(dayjs)
app.use(cropper)
app.use(infinite)
app.use(i18n)

app.use(apollo)
app.use(http)
app.use(pinia)

app.use(router)

app.use(head)

app.mount('#app')

window.$vue = app
