import { App, reactive } from 'vue'

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

export const FIREBASE_APP_CONSTANT = Symbol.for('firebase')
export const FIRE_RTDB_CONSTANT = Symbol.for('firebase-RTDB')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAHPku0i3zora2DH2Mdg5LXDYhb_mljGh0',
  authDomain: 'smileeye-v2.firebaseapp.com',
  databaseURL:
    'https://smileeye-v2-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'smileeye-v2',
  storageBucket: 'smileeye-v2.appspot.com',
  messagingSenderId: '1071334724068',
  appId: '1:1071334724068:web:1e5cec7ba89bc57c7077f1'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const plugin = {
  install(app: App) {
    app.provide(FIREBASE_APP_CONSTANT, reactive(firebaseApp))
    app.provide(FIRE_RTDB_CONSTANT, reactive(firebaseApp.database()))
  }
}

export default plugin
