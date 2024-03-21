'use client'
import React, { useState, useEffect } from 'react'

import MainView from './MainView.js'
import SubmissionPage from './SubmissionPage.js'
export default function Home() {
  const [isPastGallery, setIsPastGallery] = useState(false)
  const [pageView, setPageView] = useState('MainView')

  const handleMainViewLink = () => {
    pageView !== 'MainView' ? setPageView('MainView') : ''
  }
  useEffect(() => {
    const handleScroll = () => {
      const banner = document.getElementById('banner')
      const galleryPosition = banner.offsetHeight
      setIsPastGallery(window.scrollY > galleryPosition)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <div className='flex md:flex-row flex-col'>
        <aside
          className={`ml-6 pt-6 md:pt-12 flex flex-row items-end md:items-start md:flex-col justify-between md:justify-start md:h-screen top-0 md:w-1/6 text-english-violet text-lg px-4 md:px-2 sticky z-50 ${
            isPastGallery
              ? 'bg-english-violet text-white'
              : 'bg-white text-english-violet'
          } md:bg-white md:text-english-violet`}
        >
          <div className='flex md:flex-col flex-row md:justify-content'>
            <h2 className='text-xl md:text-3xl font-bold md:mx-auto pb-4 md:pb-0'>
              THE LIVING
              <br />
              ARCHIVE
            </h2>
          </div>
          <div className='flex flex-col justify-center h-full'>
            <nav className='flex flex-col font-bold text-md md:text-2xl'>
              <ul className='flex flex-row md:flex-col md:mx-auto md:gap-x-0 gap-x-8'>
                <li className='pb-4'>
                  <a
                    onClick={handleMainViewLink}
                    href='#image-gallery'
                    className='hover:text-rose'
                  >
                    Gallery
                  </a>
                </li>
                <li className='pb-4'>
                  <a
                    onClick={handleMainViewLink}
                    href='#campus-map'
                    className='hover:text-rose'
                  >
                    Map
                  </a>
                </li>
                <li className='pb-4'>
                  <a
                    onClick={handleMainViewLink}
                    href='#about'
                    className='hover:text-rose'
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setPageView('SubmissionPage')
                    }}
                    href='#submit'
                    className='hover:text-rose'
                  >
                    Submit
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <main className='md:mt-12 md:w-5/6 mb-24'>
          <div className='bg-english-violet flex flex-col md:flex-row mb-12 h-1/12 w-auto'>
            <div className='flex-1 p-8'>
              <h2 className='lg:text-5xl md:text-3xl text-2xl font-bold text-white lg:pt-36 md:pt-24'>
                EXPLORING LGBTQ+ HISTORY AT LMU
              </h2>
              <h3 className='pt-4 text-white'>
                Discover queer stories as seen in the Loyola Marymount
                University records. The Living Archive serves as a platform to
                amplify voices and experiences of typically overlooked groups in
                the LMU community.
              </h3>
            </div>
            <div className='flex-1 p-8 flex justify-end items-end'>
              <img
                src='../static/photo.jpg'
                className='w-auto h-auto object-cover min-h-1'
                alt='Photo of the LMU bluff view at dusk overlooking the library and Playa Vista neighborhood.'
              />
            </div>
          </div>
          <div>
            {pageView === 'MainView' && <MainView />}
            {pageView === 'SubmissionPage' && <SubmissionPage />}
          </div>
        </main>
      </div>
    </div>
  )
}
