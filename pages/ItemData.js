'use client'

import React from 'react'
import { useEffect, useState } from 'react'

import { storage, app, firebase, firestore } from './firebase/firebaseConfig'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { collection, getDocs } from 'firebase/firestore'

import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from 'firebase-admin/firestore'

// initializeApp()
function ItemData({ name }) {
  const [itemData, setItemData] = useState()

  useEffect(() => {
    console.log('hello from item data')
    const fetchMetadata = async () => {
      try {
        console.log(name)
        const collectionRef = collection(firestore, 'data')

        getDocs(collectionRef)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = doc.data()
              console.log('Document data:', data)
            })
          })
          .catch((error) => {
            console.error('Error getting documents:', error)
          })
      } catch (error) {
        console.error('Error fetching item data from Cloud Firestore', error)
      }
    }
    fetchMetadata()
  }, [])

  return (
    <div>
      <p>item data - trying to fetch!</p>
    </div>
  )
}

export default ItemData
