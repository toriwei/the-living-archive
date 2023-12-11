import React, { useState, useEffect } from 'react'
import ItemData from './ItemData'
import FullscreenImage from './FullscreenImage'

function Modal({ imageData, currentIndex, onClose, file, onMarkerChange }) {
  if (!imageData || imageData.length === 0) {
    return <div>Loading...</div>
  }

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex)
  const [currentFile, setCurrentFile] = useState(file)

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
    setCurrentFile(imageData[previousIndex].fileName)
    if (onMarkerChange) {
      onMarkerChange(imageData[previousIndex].position)
    }
  }

  const goToNext = () => {
    const nextIndex = (currentImageIndex + 1) % imageData.length
    setCurrentImageIndex(nextIndex)
    setCurrentFile(imageData[nextIndex].fileName)
    if (onMarkerChange) {
      onMarkerChange(imageData[nextIndex].position)
    }
  }

  useEffect(() => {
    setCurrentImageIndex(currentIndex)
    setCurrentFile(file)
  }, [currentIndex, file])

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='modal-overlay fixed inset-0 bg-black opacity-50'></div>
      <div className='modal bg-white p-4 relative z-10 w-1/2 overflow-hidden'>
        <div className='modal-content px-4 flex flex-row relative'>
          <span
            className='close px-6 absolute top-2 right-2 text-2xl cursor-pointer'
            onClick={onClose}
          >
            &times;
          </span>
          <div className='absolute top-1/2 left-0 transform -translate-y-1/2 flex flex-col'>
            <span className='text-3xl cursor-pointer' onClick={goToPrevious}>
              &#8249;
            </span>
          </div>
          <img
            src={imageData[currentImageIndex].url}
            alt='Large Image'
            className='w-1/2 px-4 object-cover cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'
            onClick={openFullscreen}
          />
          <div className='absolute top-1/2 right-0 transform -translate-y-1/2 flex flex-col'>
            <span className='text-3xl cursor-pointer' onClick={goToNext}>
              &#8250;
            </span>
          </div>
          <div className='content pl-4 pr-10 w-1/2 overflow-auto'>
            <ItemData data={imageData[currentImageIndex]} />
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
