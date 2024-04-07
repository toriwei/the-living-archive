'use client'
import { useRef, useState, useEffect } from 'react'
import { storage, firestore } from '../firebase/firebaseConfig'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc, addDoc, collection } from 'firebase/firestore'

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
    LMU_location: '',
    notes: '',
    permission: false,
    adminApproval: null,
    file: null,
    generatedFileName: '',
  }
  const [responses, setResponses] = useState(initialState)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)
  const [submitting, setSubmitting] = useState(false)
  const MISSING_REQUIREMENT_ERROR = 'required'

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

  const validateRequiredValues = () => {
    const submissionErrors = {}

    if (responses.email === '') {
      submissionErrors.missingEmail = MISSING_REQUIREMENT_ERROR
    }

    if (responses.email.length !== 0 && !responses.email.includes('@')) {
      submissionErrors.invalidEmail = 'Must enter valid email address'
    }

    if (responses.name === '') {
      submissionErrors.name = MISSING_REQUIREMENT_ERROR
    }

    if (responses.file === null) {
      submissionErrors.file = MISSING_REQUIREMENT_ERROR
    }

    if (responses.title === '') {
      submissionErrors.title = MISSING_REQUIREMENT_ERROR
    }

    if (responses.permission === false) {
      submissionErrors.permission = 'Must accept agreement'
    }

    setErrors(submissionErrors)
    return submissionErrors
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
    setErrors(validateRequiredValues())
    setSubmitting(true)
  }

  const finishSubmit = async (e) => {
    // storage upload
    if (responses.file) {
      const storageRef = ref(
        storage,
        'submission_archive/' + responses.generatedFileName
      )
      try {
        await uploadBytesResumable(storageRef, responses.file)
        console.log('File uploaded to Storage successfully')
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

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit()
    }
  }, [errors])

  return (
    <div className='gap-y-8	flex flex-col px-4 md:px-0 text-english-violet'>
      <h2 className='text-5xl font-bold'>Submit an Item</h2>
      <form
        className='gap-y-8 flex flex-col text-lg'
        onSubmit={handleSubmit}
        noValidate
      >
        <div className='contributor flex flex-col gap-y-4'>
          <h3 className='text-3xl font-bold'>Contributor</h3>
          <div>
            <label htmlFor='name' className='block'>
              Name{' '}
              {errors.name && (
                <span className='text-rose text-sm'> {errors.name}</span>
              )}
            </label>
            <input
              required
              type='text'
              id='name'
              value={responses.name}
              onChange={handleChange}
              className={`border ${
                errors.name ? 'border-rose' : 'border-english-violet'
              } px-2 py-1 rounded-md`}
            />
          </div>
          <div className='flex items-center gap-x-2 mt-1'>
            <input
              type='checkbox'
              id='displayName'
              checked={responses.displayName}
              onChange={handleChange}
              className='accent-english-violet w-4 h-4 cursor-pointer'
            />
            <label htmlFor='displayName' className='text-base'>
              I would like my name to be displayed alongside the record{' '}
              <span className='text-sm'>(optional)</span>
            </label>
          </div>
          <div>
            <label htmlFor='email' className='block'>
              Email{' '}
              {errors.missingEmail && (
                <span className='text-rose text-sm'>{errors.missingEmail}</span>
              )}
            </label>
            <input
              required
              type='text'
              id='email'
              value={responses.email}
              onChange={handleChange}
              className={`border ${
                errors.name ? 'border-rose' : 'border-english-violet'
              } px-2 py-1 rounded-md`}
            />
            {errors.invalidEmail && (
              <span className='block text-rose text-sm'>
                {errors.invalidEmail}
              </span>
            )}
          </div>
        </div>
        <div className='item flex flex-col gap-y-4'>
          <h3 className='text-3xl font-bold'>Item</h3>
          <div>
            <label htmlFor='file' className='block'>
              Upload File{' '}
              {errors.file && (
                <span className='text-rose text-sm'>{errors.file}</span>
              )}
            </label>
            <input
              required
              ref={fileInputRef}
              type='file'
              id='file'
              accept='.jpg, .jpeg'
              onChange={handleChange}
              className={`border ${
                errors.name ? 'border-rose' : 'border-english-violet'
              } px-2 py-1 rounded-md`}
            />
            <p className='mt-1 text-base'>JPG or JPEG only</p>
          </div>
          <div>
            <label htmlFor='title' className='block'>
              Title{' '}
              {errors.title && (
                <span className='text-rose text-sm'>{errors.title}</span>
              )}
            </label>
            <input
              required
              type='text'
              id='title'
              value={responses.title}
              onChange={handleChange}
              className={`border ${
                errors.name ? 'border-rose' : 'border-english-violet'
              } px-2 py-1 rounded-md`}
            />
          </div>
          <div>
            <label htmlFor='date' className='block'>
              Date <span className='text-sm'>(optional)</span>
            </label>
            <input
              type='text'
              id='date'
              value={responses.date}
              onChange={handleChange}
              maxLength={10}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
            <p className='mt-1 text-base'>DD/MM/YYYY or YYYY format</p>
          </div>
          <div>
            <label htmlFor='description' className='block'>
              Description <span className='text-sm'>(optional)</span>
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
              Tags/Keywords <span className='text-sm'>(optional)</span>
            </label>
            <input
              type='text'
              id='tags'
              value={responses.tags}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
            <p className='mt-1 text-base'>
              Separate by comma (ex: student life, clubs and organizations)
            </p>
          </div>
          <div>
            <label htmlFor='author' className='block'>
              Author/Creator <span className='text-sm'>(optional)</span>
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
              Format <span className='text-sm'>(optional)</span>
            </label>
            <input
              type='text'
              id='format'
              value={responses.format}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
            <p className='mt-1 text-base'>
              Ex: Yearbook, Newspaper, Art, Photo
            </p>
          </div>
          <div>
            <label htmlFor='LMU_location' className='block'>
              LMU Location <span className='text-sm'>(optional)</span>
            </label>
            <input
              type='text'
              id='LMU_location'
              value={responses.LMU_location}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
          </div>
          <div>
            <label htmlFor='notes' className='block'>
              Notes/Additional Information{' '}
              <span className='text-sm'>(optional)</span>
            </label>
            <input
              type='text'
              id='notes'
              value={responses.notes}
              onChange={handleChange}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
            <p className='mt-1 text-base'>
              Information only for the The Living Archive team
            </p>
          </div>
        </div>

        <div className='permissions flex flex-col gap-y-4'>
          <h3 className='text-3xl font-bold'>Permissions</h3>
          <div>
            <p>
              By submitting this form, I grant permission to have this record be
              considered for inclusion for The Living Archive. I understand that
              my submission may be utilized for other displays, including, but
              not limited to, social media, presentations, and other
              exhibitions. I retain ownership of the submitted content but give
              The Living Archive permission to use and distribute the submitted
              materials.
            </p>
            <div>
              <div className='flex items-center gap-x-2 mt-1'>
                <input
                  required
                  type='checkbox'
                  id='permission'
                  checked={responses.permission}
                  onChange={handleChange}
                  className='accent-english-violet w-4 h-4 cursor-pointer'
                />
                <label htmlFor='permission' className='block'>
                  I agree
                </label>
              </div>
              {errors.permission && (
                <span className='text-rose text-sm'>{errors.permission}</span>
              )}
            </div>
          </div>
          <button
            type='submit'
            className='bg-english-violet text-white text-center	w-48 mt-4 px-8 py-2 rounded-md'
          >
            Submit
          </button>
          {Object.keys(errors).length !== 0 ? (
            <p className='text-rose'>Please enter all required fields</p>
          ) : submitting ? (
            <span className='text-rose'>
              Successfully submitted. Thank you!
            </span>
          ) : null}
        </div>
      </form>
    </div>
  )
}
