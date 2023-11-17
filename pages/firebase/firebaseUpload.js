// NOTE: if object is updated so that a specific attribute is no longer being
// used, it must be manually deleted from firebase

const data = require('./archiveMetadata.json')
const db = require('./firebaseAdminConfig')
const axios = require('axios')
const collectionRef = db.collection('data') // Firestore collection name
async function addDataToFirestore(data) {
  for (const key in data) {
    let newData = data[key]
    const documentID = key // image title (ex: Loyolan_9_16_1992)

    // Check if the document already exists
    const docRef = collectionRef.doc(documentID)
    const docSnapshot = await docRef.get()

    if (!docSnapshot.exists) {
      await docRef.set(newData)
      console.log(`Data ADDED for ${documentID} successfully`)
    } else {
      const existingData = docSnapshot.data()
      if (!deepEquals(existingData, newData)) {
        // Call the Geocoding API to set the latitude and longitude for
        // items that have an LMU location associated with them
        if (newData.hasOwnProperty('LMU_location')) {
          // TO DO: currently resets lat/long and newData every time existingData != newData
          // but should only reset if the lat/long is not there or needs to be updated
          newData = await setLatitudeAndLongitude(newData)
        }

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

async function setLatitudeAndLongitude(newData) {
  const apiKey = process.env.GOOGLE_API_KEY
  const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

  try {
    const response = await axios.get(apiUrl, {
      params: {
        address: `${location}, Loyola Marymount University`,
        key: apiKey,
      },
    })

    const result = response.data.results[0]
    if (result) {
      const { lat, lng } = result.geometry.location
      newData.lat = lat
      newData.long = lng
      return newData
    } else {
      console.log('Unable to retrieve coordinates')
    }
  } catch (error) {
    console.error(error)
  }
}

addDataToFirestore(data)
