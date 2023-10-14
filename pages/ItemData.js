'use client'

import React from 'react'
import { useEffect, useState } from 'react'

import { firestore } from './firebase/firebaseConfig'
import { collection, doc, getDoc } from 'firebase/firestore'

function ItemData({ name }) {
  const [itemData, setItemData] = useState([])

  const newspaperKeys = ['title', 'section', 'date', 'page']
  const yearbookKeys = [
    'date',
    'description',
    'source_metadata["Title"]',
    'LMU_location',
  ]

  useEffect(() => {
    console.log('hello from item data')

    // TO DO: logic to determine if we need info just one doc (ex: for modal) or all (ex: showing titles in gallery view)
    const fetchMetadata = async () => {
      try {
        console.log(name)
        const collectionRef = collection(firestore, 'data')
        console.log(collectionRef)
        console.log(name)
        const docRef = doc(
          firestore,
          'data',
          name.substring(0, name.indexOf('.'))
        )
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data())
          setItemData(docSnap.data())
        } else {
          console.log('No such document!')
        }

        // getting data for all docs --> future implementation --> could separate to different file

        // getDocs(collectionRef)
        //   .then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //       const data = doc.data()
        //       console.log('Document data:', data)
        //     })
        //   })
        //   .catch((error) => {
        //     console.error('Error getting documents:', error)
        //   })
      } catch (error) {
        console.error('Error fetching item data from Cloud Firestore', error)
      }
    }
    fetchMetadata()
  }, [])

  function displayData() {
    let keys = []
    switch (itemData.source_type) {
      case 'Newspapers':
        keys = newspaperKeys
        break
      case 'Yearbooks':
        keys = yearbookKeys
        break
    }

    // TODO: customize/change label to something different than the key, ex: source_metadata["Title"] should be just "Title"
    return keys.map((key) => {
      if (key in itemData || key.startsWith('source_metadata')) {
        console.log(itemData[key])
        return (
          <p key={key}>
            <span>{key}:</span>{' '}
            <span>
              {key.startsWith('source_metadata')
                ? itemData['source_metadata'][
                    `${key.substring(key.indexOf('[') + 2, key.length - 2)}`
                  ]
                : itemData[key]}
            </span>
          </p>
        )
      } else {
        console.log(key)
      }
    })
  }
  return <div>{displayData()}</div>
}

export default ItemData
