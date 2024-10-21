import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBAflJuABT1fHYygtTz1Fht_2WK1YnleZM",
  authDomain: "haushalt-app-3271e.firebaseapp.com",
  projectId: "haushalt-app-3271e",
  storageBucket: "haushalt-app-3271e.appspot.com",
  messagingSenderId: "106529297080",
  appId: "1:106529297080:web:8f3727e322cfbd81c75a4d"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
