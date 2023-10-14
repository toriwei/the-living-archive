// NOTE: if object is updated so that a specific attribute is no longer being
// used, it must be manually deleted from firebase

const data = require('./archiveMetadata.json')
const db = require('./firebaseAdminConfig')
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
      console.log(`Data ADDED for ${documentID} successfully`)
    } else {
      const existingData = docSnapshot.data()
      if (!deepEquals(docSnapshot.data(), newData)) {
        console.log(docSnapshot.data())
        console.log(newData)
        await docRef.update(newData)
        console.log(`Data UPDATED for ${documentID}`)
      } else {
        console.log(`Data SAME for ${documentID}. No updated made.`)
      }
    }
  }
}

function deepEquals(existingData, newData) {
  if (typeof existingData !== 'object') {
    return existingData === newData
  }

  return (
    Object.keys(existingData).length === Object.keys(newData).length &&
    Object.keys(existingData).every((key) =>
      deepEquals(existingData[key], newData[key])
    )
  )
}

addDataToFirestore(data)
