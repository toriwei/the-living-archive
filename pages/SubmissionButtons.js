import { storage, firestore } from '../firebase/firebaseConfig'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export default function SubmissionButtons(data) {
  const handleAccept = async () => {
    console.log('clicked accept')
    console.log(data.imageData.fileName)
    try {
      // Storage file
      const submissionRef = ref(
        storage,
        `submission_archive/${data.imageData.fileName}`
      )
      const downloadURL = await getDownloadURL(submissionRef)
      const archivesRef = ref(storage, `archive/${data.imageData.fileName}`)
      const blob = await fetch(downloadURL).then((response) => response.blob()) // downloads file as a blob

      // Firestore data
      const docName = data.imageData.fileName.split('.')[0]
      const submissionDataRef = doc(firestore, 'submission_data', docName)
      const snapshot = await getDoc(submissionDataRef)

      if (snapshot.exists()) {
        let submissionData = snapshot.data()
        const newDataRef = doc(firestore, 'data', docName)

        submissionData = {
          ...submissionData,
          adminApproval: true,
        }

        // firestore doc exists, so upload image
        await uploadBytes(archivesRef, blob)
        console.log('Image copied to public archive successfully')

        // Update adminApproval in submission_data
        await setDoc(submissionDataRef, submissionData, { merge: true })
        console.log('adminApproval set to true in submission_data')

        // Upload data to public archive with updated adminApproval
        await setDoc(newDataRef, submissionData)
        console.log('Data copied to public archive successfully')
      } else {
        console.error('Submission data document does not exist')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className='flex gap-x-2'>
      <button className='border border-english-violet bg-english-violet text-white text-center hover:bg-white hover:text-red-500 w-24 mt-4 px-2 py-2 rounded-md'>
        Deny
      </button>
      <button
        onClick={handleAccept}
        className='border border-english-violet bg-english-violet text-white text-center hover:bg-white hover:text-green-500 w-24 mt-4 px-2 py-2 rounded-md'
      >
        Accept
      </button>
    </div>
  )
}
