import { createApp } from 'vue'
import App from './App.vue'
import './assets/less/ant.less'
import './assets/css/tailwind.css'

import Antd from 'ant-design-vue';

// Cookie
import VueCookies from 'vue-cookies'


// Apollo
import apolloClient from "./plugins/apollo"
import { DefaultApolloClient } from '@vue/apollo-composable'
// request axios
import http from './plugins/axios'

// Router
import router from "./routes"

// Animation
import animejs from './plugins/animejs'
import VueLottie from '@nguyenshort/vue-lottie'
import {createPinia} from "pinia";

// Pinna store
const pinia = createPinia()


// Mounted Teleport
import teleport from "./plugins/teleport";

const app = createApp(App)
app.use(Antd)
app.use(animejs)
app.use(VueLottie)
app.use(VueCookies)
app.use(teleport)

app.provide('apollo', { DefaultApolloClient, apolloClient })
app.use(http)
app.use(pinia)

app.use(router)

app.mount('#app')

window.$vue = app
