'use client'
import { useEffect, useState, useRef } from 'react'
import { storage, firestore } from '../firebase/firebaseConfig'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { doc, getDoc } from 'firebase/firestore'

import Modal from './Modal'
import Pagination from './Pagination'

export async function fetchImageData(storageFolder, firestoreFolder) {
  try {
    const archiveRef = ref(storage, storageFolder)
    const imagesList = await listAll(archiveRef)

    const images = await Promise.all(
      imagesList.items
        // .filter((item) => !item.name.startsWith('US')) // TODO: filter out unapproved
        .map(async (item) => {
          const url = await getDownloadURL(item)
          const metadata = await getMetadata(item)
          const fileName = metadata.name

          // TODO: test case, skip over image if there is no corresponding fileName
          const docRef = doc(
            firestore,
            firestoreFolder,
            fileName.substring(0, fileName.indexOf('.'))
          )
          const docSnap = await getDoc(docRef)
          const itemData = docSnap.data()

          if (!itemData || !itemData.title) {
            console.log('Skipping image:', fileName)
            return null
          }

          return {
            url,
            fileName,
            title: itemData.title,
            obj: itemData,
          }
        })
    )

    const imageOrder = images
      .filter((image) => image !== null && image.obj !== null)
      .sort((a, b) => {
        // Check if both images have dates
        if (a.obj.date && b.obj.date) {
          const dateDifference = new Date(a.obj.date) - new Date(b.obj.date)
          if (dateDifference !== 0) {
            return dateDifference
          }
        } else if (!a.obj.date && b.obj.date) {
          // If only a has null date, it should come after b
          return 1
        } else if (a.obj.date && !b.obj.date) {
          // If only b has null date, it should come before a
          return -1
        }

        // If both dates are null or equal, sort by page
        return a.obj.page - b.obj.page
      })

    return imageOrder
  } catch (error) {
    console.error('Error fetching images from Firebase Storage:', error)
    return []
  }
}
function ImageGallery({ storageFolder, firestoreFolder, isGalleryRecord }) {
  const PAGE_SIZE = 16
  const [imageData, setImageData] = useState([])
  const [selectedName, setSelectedName] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('pending')
  const scrollRef = useRef(null)

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const fetchImages = async () => {
    try {
      const images = await fetchImageData(storageFolder, firestoreFolder)
      // Filter out null values
      const filteredImages = images.filter((image) => image !== null)
      setImageData(filteredImages)
    } catch (error) {
      console.error('Error fetching images from Firebase Storage:', error)
    }
  }

  useEffect(() => {
    console.log('hello')
    fetchImages()
  }, [currentPage]) // Fetch images whenever the currentPage changes
  // Filter images based on the search query in any property of image.obj
  const filteredImages = imageData.filter((image) => {
    const includesSearchQuery = Object.values(image.obj).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (!isGalleryRecord) {
      return (
        includesSearchQuery &&
        (statusFilter === 'all' ||
          (statusFilter === 'pending'
            ? image.obj.adminApproval === 'pending'
            : image.obj.adminApproval.toString() === statusFilter))
      )
    } else {
      return includesSearchQuery
    }
  })

  const indexOfLastRecord = currentPage * PAGE_SIZE
  const indexOfFirstRecord = indexOfLastRecord - PAGE_SIZE

  const currentImages = filteredImages.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  )
  const numberPages = Math.ceil(filteredImages.length / PAGE_SIZE)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isCurrentPage = (pageIndex) => pageIndex === currentPage
  return (
    <div className='pt-12 pl-12 pr-12' ref={scrollRef}>
      {!isGalleryRecord && (
        <div className='flex items-center gap-x-4 mb-4 font-bold text-lg'>
          <button
            className={`${
              statusFilter === 'pending' ? 'text-rose' : 'text-gray-600'
            }`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`${
              statusFilter === 'all' ? 'text-rose' : 'text-gray-600'
            }`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            className={`${
              statusFilter === 'true' ? 'text-rose' : 'text-gray-600'
            }`}
            onClick={() => setStatusFilter('true')}
          >
            Accepted
          </button>
          <button
            className={`${
              statusFilter === 'false' ? 'text-rose' : 'text-gray-600'
            }`}
            onClick={() => setStatusFilter('false')}
          >
            Denied
          </button>
        </div>
      )}
      <div className='flex flex-col md:flex-row w-full'>
        <div className='pb-4 md:pb-8 flex flex-grow items-center'>
          <input
            className='block w-1/2 p-4 ps-5 sm:pr-24 pr-0 font-semibold text-english-violet border border-gray-300 border-r-0 rounded-l-md outline-english-violet'
            type='text'
            placeholder='Search'
            value={searchQueryTemp}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
          <button
            className='p-4 font-semibold text-white bg-english-violet border border-english-violet rounded-r-md flex items-center'
            onClick={handleSearch}
          >
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </button>
        </div>

        {currentImages.length > 0 && (
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            numberPages={numberPages}
            isCurrentPage={isCurrentPage}
            className='flex-end'
          />
        )}
      </div>

      <div className='grid md:grid-cols-4 grid-cols-2 gap-4 items-start'>
        {currentImages.length > 0 &&
          currentImages.map((image, index) => (
            <div
              key={`gallery-${index}`}
              className='relative align-baseline flex flex-col'
            >
              <div
                key={image.fileName}
                className='relative flex flex-col justify-end h-[20vh] md:h-[40vh]'
              >
                <img
                  className='relative archiveItem object-contain max-w-full max-h-full cursor-pointer'
                  key={index}
                  src={image.url}
                  alt={`Image ${index}`}
                  onClick={() => openModal(image.url, index)}
                />
              </div>
              <span className='mt-2 text-center'>
                {image.obj.date
                  ? `${image.title} (${
                      typeof image.obj.date === 'string' &&
                      image.obj.date.includes('/')
                        ? image.obj.date.split('/').pop()
                        : image.obj.date
                    })`
                  : image.title}
              </span>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <Modal
          imageData={currentImages}
          currentIndex={selectedImageIndex}
          onClose={closeModal}
          file={selectedName}
          isGalleryRecord={isGalleryRecord}
        />
      )}

      {currentImages.length > 0 && (
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          numberPages={numberPages}
          isCurrentPage={isCurrentPage}
        />
      )}
    </div>
  )
}

export default ImageGallery
