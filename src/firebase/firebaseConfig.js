// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyCRg2P9sgFmsCWwmnH5h8VCH7Ey6GVy5-k',
  authDomain: 'the-living-archive-eefa1.firebaseapp.com',
  projectId: 'the-living-archive-eefa1',
  storageBucket: 'the-living-archive-eefa1.appspot.com',
  messagingSenderId: '337419197847',
  appId: '1:337419197847:web:14db0727be8683ebbeb8d2',
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const firestore = getFirestore(app)
