import { useState, useEffect } from 'react'
import EmailPassword from './EmailPassword.js'

export default function CreateAccountModal({ onClose }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='modal-overlay fixed inset-0 bg-black opacity-50'></div>
      <div className='modal bg-white p-4 relative z-10 w-2/3 max-h-[80vh] overflow-hidden'>
        <div className='modal-content px-4 flex flex-col relative'>
          <div className='flex items-center'>
            <h3 className='text-3xl font-bold'>Create Account</h3>
            <span
              className='close px-6 absolute right-2 text-2xl cursor-pointer'
              onClick={onClose}
            >
              &times;
            </span>
          </div>
          <p>details details details</p>
          <EmailPassword loginType='signup' />
        </div>
      </div>
    </div>
  )
}
