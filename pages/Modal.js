import React from 'react'

function Modal({ imageUrl, onClose }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='modal-overlay fixed inset-0 bg-black opacity-50'></div>
      <div className='modal bg-white p-4 relative z-10'>
        <div className='modal-content px-4 flex flex-row'>
          <span
            className='close px-6 absolute top-2 right-2 text-2xl cursor-pointer'
            onClick={onClose}
          >
            &times;
          </span>
          <img src={imageUrl} alt='Large Image' className='w-96 px-4' />
          <div className='content pl-4 pr-10'>metadata will go here</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
