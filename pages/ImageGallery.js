'use client'
import { useEffect, useState } from 'react'
import { storage } from './firebase/firebaseConfig'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import metadata from './firebase/archiveMetadata.json'

function ImageGallery({ onImageClick }) {
  const [imageUrls, setImageUrls] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const archiveRef = ref(storage, 'archive')
        const imagesList = await listAll(archiveRef)

        const urls = await Promise.all(
          imagesList.items.map(async (item) => {
            const url = await getDownloadURL(item)
            console.log(url)
            return url
          })
        )
        setImageUrls(urls)
      } catch (error) {
        console.error('Error fetching images from Firebase Storage:', error)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className='flex justify-center items-center'>
      {imageUrls.map((url, index) => (
        <img
          className='archiveItem w-80'
          key={index}
          src={url}
          alt={`Image ${index}`}
          onClick={() => onImageClick(url)}
        />
      ))}
    </div>
  )
}

export default ImageGallery
