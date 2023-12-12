'use client'
import ImageGallery from './ImageGallery'
import CampusMap from './CampusMap'

export default function Home() {
  return (
    <div>
      <div className='flex mt-4'>
        <aside className='h-screen sticky top-0 w-1/6 text-english-violet text-lg'>
          <h2 className='text-3xl font-bold text-english-violet mx-auto'>
            THE LIVING ARCHIVE
          </h2>
          <div className='flex flex-col justify-center h-full'>
            <nav className='flex flex-col justify-center font-bold text-2xl '>
              <ul className='mx-auto'>
                <li className='pb-4'>
                  <a href='#image-gallery' className='hover:text-rose'>
                    Gallery
                  </a>
                </li>
                <li className='pb-4'>
                  <a href='#campus-map' className='hover:text-rose'>
                    Campus Map
                  </a>
                </li>
                <li>
                  <a href='#about' className='hover:text-rose'>
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <main className='w-5/6 mt-8'>
          <div className='bg-english-violet flex flex-row mb-12'>
            <div className='flex-1 p-8'>
              <h2 className='text-5xl font-bold text-white pt-36'>
                EXPLORE LGBTQ+ HISTORY
              </h2>
              <h3 className='pt-4 text xl text-white'>
                Documenting LGBTQ+ history as seen in the Loyola Marymount
                University archives. Scroll to explore. Something more here
                something more here.
              </h3>
            </div>
            <div className='flex-1 p-8'>
              <img
                src='../static/photo.jpg'
                className='w-auto h-auto object-cover'
              />
            </div>
          </div>
          <section id='image-gallery'>
            <h2 className='text-5xl font-bold text-english-violet'>Gallery</h2>
            <ImageGallery />
          </section>
          <section id='campus-map'>
            <h2 className='pt-8 text-5xl font-bold text-english-violet'>
              Campus Map
            </h2>
            <CampusMap id='campus-map' />
          </section>
          <section id='about'>
            <h2 className='pt-8 text-5xl font-bold text-english-violet'>
              About
            </h2>
          </section>
        </main>
      </div>
    </div>
  )
}
