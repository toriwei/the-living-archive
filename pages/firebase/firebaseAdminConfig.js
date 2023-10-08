const admin = require('firebase-admin')
const data = require('./archiveMetadata.json')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../', '.env') })
// TO-DO: probably have to re-think structure. only checks if key (image title) exists,
// not if the data is different updated. also won't need to check entire database every
// time.

// Initialize the app with a service account, granting admin privileges
const account = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
admin.initializeApp({
  credential: admin.credential.cert(account),
})

// Initialize Firestore
const db = admin.firestore()

const collectionRef = db.collection('data') // Firestore collection name
async function addDataToFirestore(data) {
  for (const key in data) {
    const newData = data[key]
    const documentID = key // image title (ex: Loyolan_9_16_1992)

    // Check if the document already exists
    const docRef = collectionRef.doc(documentID)
    const docSnapshot = await docRef.get()

    if (!docSnapshot.exists) {
      await docRef.set(newData)
      console.log(`Data added for ${documentID} successfully`)
    } else {
      console.log(`Data for ${documentID} already exists.`)
    }
  }
}

addDataToFirestore(data)
