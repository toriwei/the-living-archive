'use client'
import { useEffect, useState } from 'react'
import { storage, firestore } from './firebase/firebaseConfig'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { doc, getDoc } from 'firebase/firestore'

import Modal from './Modal'

function ImageGallery() {
  const [imageData, setImageData] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)
  const [selectedName, setSelectedName] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal(imageUrl, fileName) {
    setSelectedImg(imageUrl)
    setSelectedName(fileName)
    setIsModalOpen(true)
  }

  function closeModal() {
    setSelectedImg(null)
    setSelectedName(null)
    setIsModalOpen(false)
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const archiveRef = ref(storage, 'archive')
        const imagesList = await listAll(archiveRef)

        const images = await Promise.all(
          imagesList.items.map(async (item) => {
            const url = await getDownloadURL(item)
            const metadata = await getMetadata(item)
            const fileName = metadata.name

            const docRef = doc(
              firestore,
              'data',
              fileName.substring(0, fileName.indexOf('.'))
            )
            const docSnap = await getDoc(docRef)
            const itemData = docSnap.data()
            let newObj = {}
            switch (itemData.source_type) {
              case 'Newspapers':
                newObj = {
                  title: itemData.title,
                  section: itemData.section,
                }
                break
              case 'Yearbooks':
                newObj = {
                  title: itemData.source_metadata.Title,
                  location: itemData.LMU_location,
                  description: itemData.description,
                }
                break
            }
            return {
              url,
              fileName,
              title: newObj.title,
              obj: itemData,
            }
          })
        )
        setImageData(images)
      } catch (error) {
        console.error('Error fetching images from Firebase Storage:', error)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className='flex justify-center items-center'>
      {console.log(imageData)}
      {imageData.map((image, index) => (
        <div key={image.fileName}>
          <img
            className='archiveItem w-80'
            key={index}
            src={image.url}
            alt={`Image ${index}`}
            onClick={() => openModal(image.url, image.fileName)}
          />
          <span>{image.title}</span>
        </div>
      ))}
      {isModalOpen && (
        <Modal
          imageUrl={selectedImg}
          onClose={closeModal}
          file={selectedName}
        />
      )}
    </div>
  )
}

export default ImageGallery
