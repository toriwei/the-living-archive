'use client'
import ImageGallery from './ImageGallery'
import CampusMap from './CampusMap'

export default function Home() {
  return (
    <div>
      <div className='bg-pink-500 text-white p-4'>The Living Archive</div>
      <ImageGallery />
      <CampusMap />
    </div>
  )
}
