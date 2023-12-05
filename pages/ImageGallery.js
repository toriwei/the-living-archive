'use client'
import { useEffect, useState } from 'react'
import { storage, firestore } from './firebase/firebaseConfig'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { doc, getDoc } from 'firebase/firestore'

import Modal from './Modal'

export async function fetchImageData() {
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

    const imageOrder = images.sort((a, b) => {
      if (new Date(a.obj.date) - new Date(b.obj.date) !== 0) {
        return new Date(a.obj.date) - new Date(b.obj.date)
      }
      return a.obj.page - b.obj.page
    })

    return imageOrder
  } catch (error) {
    console.error('Error fetching images from Firebase Storage:', error)
    return []
  }
}
function ImageGallery() {
  const [imageData, setImageData] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)
  const [selectedName, setSelectedName] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  function openModal(imageUrl, fileName, index) {
    setSelectedImg(imageUrl)
    setSelectedName(fileName)
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  function closeModal() {
    setSelectedImg(null)
    setSelectedName(null)
    setIsModalOpen(false)
  }

  const [searchQueryTemp, setSearchQueryTemp] = useState('')

  const handleSearchChange = (e) => {
    setSearchQueryTemp(e.target.value)
  }

  const handleSearch = () => {
    setSearchQuery(searchQueryTemp)
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await fetchImageData()
        setImageData(images)
      } catch (error) {
        console.error('Error fetching images from Firebase Storage:', error)
      }
    }

    fetchImages()
  }, [])

  // Filter images based on the search query in any property of image.obj
  const filteredImages = imageData.filter((image) =>
    Object.values(image.obj).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div>
      <input
        type='text'
        placeholder='Search images...'
        value={searchQueryTemp}
        onChange={handleSearchChange}
      />

      <button onClick={handleSearch}>Search</button>

      <div className='grid grid-cols-4 gap-4'>
        {filteredImages.map((image, index) => (
          <div key={image.fileName} className='relative'>
            <img
              className='archiveItem w-full h-80 min-h-80 object-cover'
              key={index}
              src={image.url}
              alt={`Image ${index}`}
              onClick={() => openModal(image.url, image.fileName, index)}
            />
            <span>{image.title}</span>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          imageData={filteredImages}
          currentIndex={selectedImageIndex}
          onClose={closeModal}
          file={selectedName}
        />
      )}
    </div>
  )
}

export default ImageGallery
