import React, { useState, useEffect } from 'react'
import ItemData from './ItemData'
import FullscreenImage from './FullscreenImage'
import SubmissionButtons from './SubmissionButtons'

function Modal({
  imageData,
  currentIndex,
  onClose,
  onMarkerChange,
  isGalleryRecord,
}) {
  if (!imageData || imageData.length === 0) {
    return <div>Loading...</div>
  }

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex)

  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  const goToPrevious = () => {
    const previousIndex =
      (currentImageIndex - 1 + imageData.length) % imageData.length
    setCurrentImageIndex(previousIndex)
    if (onMarkerChange) {
      onMarkerChange(imageData[previousIndex].position)
    }
  }

  const goToNext = () => {
    const nextIndex = (currentImageIndex + 1) % imageData.length
    setCurrentImageIndex(nextIndex)
    if (onMarkerChange) {
      onMarkerChange(imageData[nextIndex].position)
    }
  }

  useEffect(() => {
    setCurrentImageIndex(currentIndex)
  }, [currentIndex])

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='modal-overlay fixed inset-0 bg-black opacity-50'></div>
      <div className='modal bg-white p-4 relative z-10 w-2/3 max-h-[80vh] overflow-hidden'>
        <div className='modal-content max-h-[70vh] px-4 flex flex-col md:flex-row relative'>
          <span
            className='close px-6 absolute top-2 right-2 text-2xl cursor-pointer z-50'
            onClick={onClose}
          >
            &times;
          </span>
          <div className='absolute top-1/2 left-0 transform -translate-y-1/2 flex flex-col'>
            <span
              className='text-3xl cursor-pointer self-center'
              onClick={goToPrevious}
            >
              &#8249;
            </span>
          </div>
          <img
            src={imageData[currentImageIndex].url}
            alt='Large Image'
            className='sm:w-1/2 px-4 object-contain cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'
            onClick={openFullscreen}
          />
          <div className='absolute top-1/2 right-0 transform -translate-y-1/2 flex flex-col'>
            <span className='text-3xl cursor-pointer' onClick={goToNext}>
              &#8250;
            </span>
          </div>
          <div className='flex flex-col content pl-4 pr-10 sm:w-1/2 h-full overflow-auto'>
            <div>
              <ItemData
                data={imageData[currentImageIndex]}
                isGalleryRecord={isGalleryRecord}
              />
            </div>
            {!isGalleryRecord && (
              <SubmissionButtons imageData={imageData[currentImageIndex]} />
            )}
          </div>
        </div>
      </div>
      {isFullscreen && (
        <FullscreenImage
          imageUrl={imageData[currentImageIndex].url}
          onCloseFullscreen={closeFullscreen}
        />
      )}
    </div>
  )
}

export default Modal
