'use client'
import ImageGallery from './ImageGallery'
import CampusMap from './CampusMap'
import About from './About.js'
export default function Home() {
  return (
    <div>
      <div className='flex mt-12'>
        <aside className='h-screen sticky top-0 w-1/6 text-english-violet text-lg pr-2'>
          <div className='flex flex-col justify-content'>
            <h2 className='text-3xl font-bold text-english-violet mx-auto'>
              THE LIVING
              <br />
              ARCHIVE
            </h2>
          </div>
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
        <main className='w-5/6 mb-24'>
          <div className='bg-english-violet flex flex-row mb-12'>
            <div className='flex-1 p-8'>
              <h2 className='text-5xl font-bold text-white pt-36'>
                EXPLORING LGBTQ+ HISTORY AT LMU
              </h2>
              <h3 className='pt-4 text-white'>
                Discover queer stories as seen in the Loyola Marymount
                University records. The Living Archive serves as a platform to
                amplify voices and experiences of typically overlooked groups in
                the LMU community.
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
            <About />
          </section>
        </main>
      </div>
    </div>
  )
}
