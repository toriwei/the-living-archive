'use client'
import { useState } from 'react'
import ImageGallery from './ImageGallery'
import Modal from './Modal'
export default function Home() {
  const [selectedImg, setSelectedImg] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false) // Add modal state

  const openModal = (imageUrl) => {
    setSelectedImg(imageUrl)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedImg(null)
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className='bg-pink-500 text-white p-4'>header</div>

      <ImageGallery onImageClick={openModal} />
      {isModalOpen && <Modal imageUrl={selectedImg} onClose={closeModal} />}
    </div>
  )
}
