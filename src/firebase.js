import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import Constants from 'expo-constants'

const app = initializeApp(Constants.manifest.extra.firebaseConfig)

export const db = getFirestore()
