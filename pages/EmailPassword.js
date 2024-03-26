import { useState } from 'react'
import { auth } from './../firebase/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

export default function EmailPassword({ isSignUp, onAuthenticate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const approvedEmails = ['toriwei02@gmail.com'] // eventually store in firestore
  const [passwordsMatch, setPasswordsMatch] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!approvedEmails.includes(email)) {
        console.log('not allowed email')
        // message for non auth emails
        return
      }

      if (!isSignUp) {
        await signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            console.log('USER SIGNED IN')
            console.log(userCredential)
            onAuthenticate()
          }
        )
      } else {
        console.log('here')
        if (password !== confirmedPassword) {
          console.log('passwords not same')
          setPasswordsMatch(false)
          return // Exit the function early if passwords don't match
        }
        console.log('hello')
        setPasswordsMatch(true)

        console.log(email)
        console.log(password)

        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log('USER CREATED')
            console.log(userCredential)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='gap-y-8 flex flex-col' noValidate>
      <div className='contributor flex flex-col gap-y-4'>
        <div>
          <label htmlFor='email' className='block'>
            Email:
          </label>
          <input
            required
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-english-violet px-2 py-1 rounded-md'
          />
        </div>
        <div>
          <label htmlFor='password' className='block'>
            Password:
          </label>
          <input
            required
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-english-violet px-2 py-1 rounded-md'
          />
        </div>
        {isSignUp && (
          <div>
            <label htmlFor='confirmedPassword' className='block'>
              Confirm Password:
            </label>
            <input
              required
              type='password'
              id='confirmedPassword'
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              className='border border-english-violet px-2 py-1 rounded-md'
            />
            {!passwordsMatch && (
              <p className='text-rose'>Passwords do not match.</p>
            )}
          </div>
        )}
        <button
          type='submit'
          onClick={handleSubmit}
          className='bg-english-violet text-white text-center	w-48 px-8 py-2 mb-4 rounded-md'
        >
          {isSignUp ? 'Create Account' : 'Sign In'}
        </button>
      </div>
    </form>
  )
}
