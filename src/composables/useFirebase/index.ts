import { inject } from 'vue'
import { FirebaseApp } from '@firebase/app-compat'
import { FIREBASE_APP_CONSTANT } from '@plugins/firebase'
import { getDatabase } from 'firebase/database'

export const useFirebase = (): FirebaseApp => {
  // @ts-ignore
  return inject(FIREBASE_APP_CONSTANT)!
}

// @ts-ignore
export const useFireRTDB = () => {
  return getDatabase()
}
