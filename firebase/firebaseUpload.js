const fs = require('fs')
const db = require('./firebaseAdminConfig')
const axios = require('axios')
const collectionRef = db.collection('data')
const apiKey = process.env.GOOGLE_API_KEY
const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
const LMU_PLACE_ID = 'ChIJr6RajZewwoARb8XnfwwGyho'
const IGNATIAN_CIRCLE_PLACE_ID = 'ChIJH48hJpawwoARkwNTHX-iLnM'

const dataFileName = process.argv[2]

if (!dataFileName) {
  console.error(
    'Error: Please provide the data file name as a command-line argument.'
  )
  process.exit(1)
}

if (!fs.existsSync(dataFileName)) {
  console.error(`Error: File '${dataFileName}' not found.`)
  process.exit(1)
}

const data = require(`./${dataFileName}`)

async function addDataToFirestore(data) {
  for (const key in data) {
    try {
      let dataObject = data[key]
      const dataObjectID = key // image title (ex: Loyolan_9_16_1992)

      const docRef = collectionRef.doc(dataObjectID)
      const docSnapshot = await docRef.get()

      if (!docSnapshot.exists) {
        if (dataObject.hasOwnProperty('LMU_location')) {
          let coordinates = await setLatitudeAndLongitude(
            dataObject.LMU_location
          )
          dataObject = {
            ...dataObject,
            lat: coordinates.lat,
            long: coordinates.long,
          }
        }
        await docRef.set(dataObject)
        console.log(`Data ADDED for ${dataObjectID} successfully`)
      } else if (
        dataObject.hasOwnProperty('LMU_location') &&
        (!dataObject.hasOwnProperty('lat') ||
          !dataObject.hasOwnProperty('long'))
      ) {
        let coordinates = await setLatitudeAndLongitude(dataObject.LMU_location)
        dataObject = {
          ...dataObject,
          lat: coordinates.lat,
          long: coordinates.long,
        }
        await docRef.update(dataObject)
        console.log(`Data UPDATED for ${dataObjectID} successfully`)
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
}

async function setLatitudeAndLongitude(location) {
  try {
    if ('LMU_location' === 'Alumni Mall') {
      console.log(`Location (Alumni Mall) ADDED successfully`)
      return { lat: 33.970765, long: -118.416646 }
    } else {
      if (location === "St. Robert's Auditorium") {
        location = "St. Robert's Hall"
      }

      let response = await getCoordinates(
        location,
        'Loyola Marymount University'
      )

      if (!response || !response.geometry || !response.geometry.location) {
        throw new Error('Unable to retrieve coordinates')
      }

      let initial_place_id = response.place_id
      if (initial_place_id === LMU_PLACE_ID) {
        let secondResponse = await getCoordinates(location, 'Ignatian Cir')
        let second_place_id = secondResponse.place_id
        if (
          initial_place_id !== second_place_id &&
          second_place_id !== IGNATIAN_CIRCLE_PLACE_ID
        ) {
          response = secondResponse
        }
      }

      const { lat, lng } = response.geometry.location
      console.log(`Location (${location}) ADDED successfully`)
      return { lat: lat, long: lng }
    }
  } catch (error) {
    console.error('Error:', error.message)
    return null // Return null or any default value to indicate failure
  }
}

async function getCoordinates(submittedLocation, universityLocation) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        address: `${submittedLocation}, ${universityLocation}`,
        key: apiKey,
      },
    })
    return response.data.results[0]
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    return null
  }
}

addDataToFirestore(data)
