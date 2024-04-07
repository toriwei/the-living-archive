'use client'
import { useEffect } from 'react'
import ImageGallery from './ImageGallery'
import CampusMap from './CampusMap'
import About from './About.js'
export default function MainView(section) {
  useEffect(() => {
    // window.scrollTo(0, 0)
  }, [])
  return (
    <div className='sections flex flex-col gap-y-8 px-4 md:px-0'>
      <section id='image-gallery'>
        <h2 className='text-5xl font-bold text-english-violet'>Gallery</h2>
        <ImageGallery
          storageFolder='archive'
          firestoreFolder='data'
          isGalleryRecord={true}
        />
      </section>
      <section id='campus-map'>
        <h2 className='text-5xl font-bold text-english-violet'>Map</h2>
        <CampusMap id='campus-map' />
      </section>
      <section id='about'>
        <h2 className='text-5xl font-bold text-english-violet'>About</h2>
        <About />
      </section>
    </div>
  )
}
