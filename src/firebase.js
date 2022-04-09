import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBRRnjRsQCPMTCxf0wwt0uXMguADA7I5hA',
  authDomain: 'uiilet.firebaseapp.com',
  databaseURL: 'https://uiilet-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'uiilet',
  storageBucket: 'uiilet.appspot.com',
  messagingSenderId: '824568979788',
  appId: '1:824568979788:web:84de2f6e9dad9bc17b6fe9',
  measurementId: 'G-J9JYZYNN58',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth()
