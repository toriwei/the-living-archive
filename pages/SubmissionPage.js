'use client'
import { useRef, useState } from 'react'
import { storage, firestore } from '../firebase/firebaseConfig'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

export default function SubmissionPage() {
  const initialState = {
    name: '',
    displayName: false,
    email: '',
    title: '',
    date: '',
    description: '',
    tags: [],
    author: '',
    format: '',
    location: '',
    notes: '',
    permission: false,
    adminApproval: false,
    file: null,
    generatedFileName: '',
  }
  const [responses, setResponses] = useState(initialState)
  const fileInputRef = useRef(null)

  const generateFileName = (title) => {
    let fileName = 'US_'
    fileName += Math.floor(1000 + Math.random() * 9000) // 4-digit randomized value

    // extract title and extension
    const match = title.match(/^(.*?)(\.[^.]+)?$/)
    const extractedTitle = match[1]
    const extension = match[2] || '' // empty string in case no extension

    if (extractedTitle) {
      fileName += '_' + extractedTitle.replace(/\s+/g, '_')
      // .replace(/\b\w/g, (char) => char.toUpperCase())
    }
    fileName += extension
    return fileName
  }

  const handleChange = (e) => {
    const name = e.target.id
    let value = e.target.value

    switch (name) {
      case 'file':
        value = e.target.files[0]
        responses.generatedFileName = generateFileName(value.name)
        break
      case 'date':
        value = value.replace(/-/g, '/').replace(/[^\d/]/g, '')
        if (/^\d{4}$/.test(value)) {
          value = value.slice(0, 4) // Accept "YYYY" format as is
        } else if (/^\d{2}\d{2}\d{4}$/.test(value)) {
          value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}` // Format "DDMMYYYY" to "DD/MM/YYYY"
        }
        break
      case 'tags':
        value = value.split(',')
        break
      case 'displayName':
      case 'permission':
        value = e.target.checked
        break
      default:
        break
    }

    setResponses((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // storage upload
    if (responses.file) {
      const storageRef = ref(
        storage,
        'submission_archive/' + responses.generatedFileName
      )
      try {
        await uploadBytesResumable(storageRef, responses.file)
        console.log('File uploaded successfully')
      } catch (error) {
        console.error('Error uploading file:', error)
        return
      }
    } else {
      // TODO: figure out error handling
    }

    const { file, ...dataToUpload } = responses
    const docName = dataToUpload.generatedFileName.split('.')[0]

    // Upload data to Firestore
    try {
      const docRef = doc(firestore, 'submission_data', docName)
      await setDoc(docRef, dataToUpload)
      console.log('Data uploaded to Firestore successfully')
    } catch (error) {
      console.error('Error uploading data to Firestore:', error)
      return
    }

    // Clear form data
    fileInputRef.current.value = null
    setResponses(initialState)
  }
  return (
    <div className='gap-y-8	flex flex-col px-4 md:px-0 text-english-violet'>
      <h2 className='text-5xl font-bold'>Submit an Item</h2>
      <form
        className='gap-y-8 flex flex-col'
        onSubmit={handleSubmit}
        noValidate
      >
        <div className='contributor flex flex-col gap-y-4'>
          <h3 className='text-3xl font-bold'>Contributor</h3>
          <div>
            <label htmlFor='name' className='block'>
              Name:
            </label>
            <input
              type='text'
              id='name'
              value={responses.name}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
          <div>
            <label htmlFor='displayName' className='block'>
              Display Name?
            </label>
            <input
              type='checkbox'
              id='displayName'
              checked={responses.displayName}
              onChange={handleChange}
              className='w-4 h-4 cursor-pointer'
            />
          </div>
          <div>
            <label htmlFor='email' className='block'>
              Email:
            </label>
            <input
              type='text'
              id='email'
              value={responses.email}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
        </div>
        <div className='item flex flex-col gap-y-4'>
          <h3 className='text-3xl font-bold'>Item</h3>
          <div>
            <label htmlFor='file' className='block'>
              Upload File (JPG/JPEG/PDF):
            </label>
            <input
              ref={fileInputRef}
              type='file'
              id='file'
              accept='.jpg, .jpeg, .pdf' // Specify accepted file types
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
          <div>
            <label htmlFor='title' className='block'>
              Title:
            </label>
            <input
              type='text'
              id='title'
              value={responses.title}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
          <div>
            <label htmlFor='date' className='block'>
              Date (DD/MM/YYYY or YYYY):
            </label>
            <input
              type='text'
              id='date'
              value={responses.date}
              onChange={handleChange}
              maxLength={10}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
          <div>
            <label htmlFor='description' className='block'>
              Description:
            </label>
            <textarea
              id='description'
              value={responses.description}
              onChange={handleChange}
              className='border border-english-violet w-64 px-2 py-1 rounded-md min-h-[100px]'
              rows={4}
            />
          </div>
          <div>
            <label htmlFor='tags' className='block'>
              Tags:
            </label>
            <input
              type='text'
              id='tags'
              value={responses.tags}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
          <div>
            <label htmlFor='author' className='block'>
              Author/Creator:
            </label>
            <input
              type='text'
              id='author'
              value={responses.author}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
          <div>
            <label htmlFor='format' className='block'>
              Format:
            </label>
            <input
              type='text'
              id='format'
              value={responses.format}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
          <div>
            <label htmlFor='location' className='block'>
              LMU Location:
            </label>
            <input
              type='text'
              id='location'
              value={responses.location}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
          <div>
            <label htmlFor='notes' className='block'>
              Notes/Additional Information:
            </label>
            <input
              type='text'
              id='notes'
              value={responses.notes}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
        </div>

        <div className='permissions flex flex-col gap-y-4'>
          <h3 className='text-3xl font-bold'>Permissions</h3>
          <div>
            <label htmlFor='displayName' className='block'>
              Give permission?
            </label>
            <input
              type='checkbox'
              id='permission'
              checked={responses.permission}
              onChange={handleChange}
              className='w-4 h-4 cursor-pointer'
            />
          </div>
          <button
            type='submit'
            className='bg-english-violet text-white text-center	w-48 px-8 py-2 rounded-md'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
