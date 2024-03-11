'use client'
import { useEffect } from 'react'
export default function SubmissionPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='sections flex flex-col gap-y-8 px-4 md:px-0'>
      <section id='image-gallery'>
        <h2 className='text-5xl font-bold text-english-violet'>
          Contributor Information
        </h2>
      </section>
      <section id='campus-map'>
        <h2 className='text-5xl font-bold text-english-violet'>
          Item Information
        </h2>
      </section>
      <section id='about'>
        <h2 className='text-5xl font-bold text-english-violet'>
          Permissions Information
        </h2>
      </section>
    </div>
  )
}
