// FullscreenImage.js
import React from 'react'

function FullscreenImage({ imageUrl, onCloseFullscreen }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='fullscreen-overlay fixed inset-0 bg-black opacity-50'></div>
      <div className='fullscreen-content relative w-full h-full max-w-screen-lg max-h-screen p-4'>
        <span
          className='close-fullscreen absolute top-2 right-2 text-2xl text-white cursor-pointer'
          onClick={onCloseFullscreen}
        >
          &times;
        </span>
        <img
          src={imageUrl}
          alt='Fullscreen Image'
          className='fullscreen-image w-full h-full object-contain'
        />
      </div>
    </div>
  )
}

export default FullscreenImage
