'use client'
import React from 'react'
import ItemData from './ItemData'
function Modal({ imageUrl, onClose, file }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='modal-overlay fixed inset-0 bg-black opacity-50'></div>
      <div className='modal bg-white p-4 relative z-10 w-1/2 overflow-hidden'>
        <div className='modal-content px-4 flex flex-row'>
          <span
            className='close px-6 absolute top-2 right-2 text-2xl cursor-pointer'
            onClick={onClose}
          >
            &times;
          </span>
          <img
            src={imageUrl}
            alt='Large Image'
            className='w-1/2 px-4 object-cover'
          />
          <div className='content pl-4 pr-10 w-1/2 overflow-auto'>
            <ItemData name={file} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
