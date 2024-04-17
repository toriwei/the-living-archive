const fs = require('fs')

// Read JSON data from file
const inputJson = JSON.parse(fs.readFileSync('./newInput.json', 'utf-8'))

function restructureAndFilter(jsonArray) {
  const restructuredObject = {}

  jsonArray.forEach((originalObject) => {
    const fileName = originalObject.fileName
    delete originalObject.fileName // Remove fileName property from the original object

    // Filter out properties with empty strings
    const filteredObject = Object.fromEntries(
      Object.entries(originalObject).filter(([key, value]) => value !== '')
    )

    // Add the filtered object to the restructured object
    restructuredObject[fileName] = filteredObject
  })

  return restructuredObject
}

const outputJson = restructureAndFilter(inputJson)
const outputFile = 'newData.json'

// Write the output to a new file
fs.writeFileSync(outputFile, JSON.stringify(outputJson, null, 2))

console.log(`Output written to ${outputFile}`)
