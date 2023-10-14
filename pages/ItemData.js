'use client'

import React from 'react'
import { useEffect, useState } from 'react'

import { firestore } from './firebase/firebaseConfig'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'

function ItemData({ name }) {
  const [itemData, setItemData] = useState([])

  const newspaperKeys = ['title', 'section', 'date', 'page']

  function getNewspaperData(data) {}

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

        // set object based on item source (newspaper, yearbook)

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

  return (
    <div>
      <p>item data - logging </p>
      {itemData.source_type == 'Newspapers'
        ? newspaperKeys.map((key) =>
            key in itemData ? (
              <p key={key}>
                <span>{key}:</span> <span>{itemData[key]}</span>
              </p>
            ) : (
              ''
            )
          )
        : ''}
    </div>
  )
}

export default ItemData
