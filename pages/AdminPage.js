import { useState } from 'react'
import ImageGallery from './ImageGallery'
import Login from './Login'

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const handleAuthChange = (user) => {
    setUser(user)
  }

  return (
    <div className='flex flex-col px-4 md:px-0 text-english-violet'>
      <h2 className='text-5xl font-bold'>Admin</h2>
      {!user ? (
        <div>
          <p className='pt-2 pb-4 text-xl'>
            For authorized users only. Please check back later for more
            information if you are interested in getting involved.
          </p>
          <Login onAuthChange={handleAuthChange} />
        </div>
      ) : (
        <ImageGallery
          storageFolder='submission_archive'
          firestoreFolder='submission_data'
          isGalleryRecord={false}
        />
      )}
    </div>
  )
}
