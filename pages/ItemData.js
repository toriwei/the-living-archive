'use client'

import React from 'react'
import { useEffect, useState } from 'react'

import { firestore } from './firebase/firebaseConfig'
import { collection, doc, getDoc } from 'firebase/firestore'

function ItemData({ name }) {
  const [itemData, setItemData] = useState([])
  const [title, setTitle] = useState()

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
          console.log(docSnap.data().source_type)
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
    let newObj = {}
    switch (itemData.source_type) {
      case 'Newspapers':
        newObj = {
          title: itemData.title,
          section: itemData.section,
          date: itemData.date,
          page: itemData.page,
        }
        break
      case 'Yearbooks':
        newObj = {
          date: itemData.date,
          description: itemData.description,
          title: itemData.source_metadata.Title,
          location: itemData.LMU_location,
          page: itemData.page,
        }
        break
    }

    return Object.keys(newObj).map((key) => {
      return (
        <p key={key}>
          <span>{key}:</span> <span>{newObj[key]}</span>
        </p>
      )
    })
  }
  displayData()
  return (
    <div>
      <div className='content'>{displayData()}</div>
    </div>
  )
}

export default ItemData
