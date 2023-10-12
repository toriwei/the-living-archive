'use client'

import React from 'react'
import { useEffect, useState } from 'react'

import { firestore } from './firebase/firebaseConfig'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'

function ItemData({ name }) {
  const [itemData, setItemData] = useState([])
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

        // getting data for all docs --> future implementation

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
    <div className='text-ellipsis'>
      <p>item data - logging </p>
      <p className='text-ellipsis'>{JSON.stringify(itemData)}</p>
    </div>
  )
}

export default ItemData
