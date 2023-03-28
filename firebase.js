import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCiwf2XZBqjsxsBwIiwL2b49_MCtIiejnM',
  authDomain: 'amzn-copy-962b8.firebaseapp.com',
  projectId: 'amzn-copy-962b8',
  storageBucket: 'amzn-copy-962b8.appspot.com',
  messagingSenderId: '635340009123',
  appId: '1:635340009123:web:4e56fb376ad34883759916',
}

// Initialize Firebase
const app = getApps() > 0 ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
