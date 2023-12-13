'use client'
import { useEffect, useState } from 'react'
import { storage, firestore } from '../firebase/firebaseConfig'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { doc, getDoc } from 'firebase/firestore'

import Modal from './Modal'
import Pagination from './Pagination'

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
  const PAGE_SIZE = 16
  const [imageData, setImageData] = useState([])
  const [selectedName, setSelectedName] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  function openModal(fileName, index) {
    setSelectedName(fileName)
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  function closeModal() {
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

  const indexOfLastRecord = currentPage * PAGE_SIZE
  const indexOfFirstRecord = indexOfLastRecord - PAGE_SIZE

  const currentImages = filteredImages.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  )
  const numberPages = Math.ceil(filteredImages.length / PAGE_SIZE)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
  }

  const isCurrentPage = (pageIndex) => pageIndex === currentPage
  return (
    <div className='pt-12 pl-12 pr-12'>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        numberPages={numberPages}
        isCurrentPage={isCurrentPage}
      />
      <div className='pb-8'>
        <input
          type='text'
          placeholder='Search images...'
          value={searchQueryTemp}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className='grid grid-cols-4 gap-4'>
        {currentImages.map((image, index) => (
          <div key={image.fileName} className='relative'>
            <img
              className='archiveItem w-full h-80 min-h-80 object-cover'
              key={index}
              src={image.url}
              alt={`Image ${index}`}
              onClick={() => openModal(image.url, index)}
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

      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        numberPages={numberPages}
        isCurrentPage={isCurrentPage}
      />
    </div>
  )
}

export default ImageGallery
