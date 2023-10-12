'use client'
import { useEffect, useState } from 'react'
import { storage } from './firebase/firebaseConfig'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
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

            return { url, fileName }
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
      {imageData.map((image, index) => (
        <div key={image.fileName}>
          <img
            className='archiveItem w-80'
            key={index}
            src={image.url}
            alt={`Image ${index}`}
            onClick={() => openModal(image.url, image.fileName)}
          />
          <p>{image.fileName}</p>
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
