import { useState } from 'react'
import ImageGallery from './ImageGallery'
import Login from './Login'

export default function AdminPage() {
  const SUBMISSION_STORAGE = 'submission_archive'
  const SUBMISSION_FIRESTORE = 'submission_data'
  const [user, setUser] = useState(null)

  const handleAuthChange = (user) => {
    setUser(user)
  }

  return (
    <div className='flex flex-col px-4 md:px-0 text-english-violet'>
      <h2 className='text-5xl font-bold'>Admin</h2>
      <div className='text-english-violet pt-2 pb-4 text-xl'>
        For authorized users only. Please check back later for more information
        if you are interested in getting involved.
      </div>
      {!user ? (
        <Login onAuthChange={handleAuthChange} />
      ) : (
        <ImageGallery
          storageFolder={SUBMISSION_STORAGE}
          firestoreFolder={SUBMISSION_FIRESTORE}
        />
      )}
    </div>
  )
}
