import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB0O8dNnehkSMKJnmLGWFMZiK9M7pXflU4",
  authDomain: "indlex-firebase.firebaseapp.com",
  projectId: "indlex-firebase",
  storageBucket: "indlex-firebase.appspot.com",
  messagingSenderId: "432674513281",
  appId: "1:432674513281:web:c1ef773f9b20be23f10880"
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()
const storage = getStorage(firebaseApp)

export { db, auth, storage }
