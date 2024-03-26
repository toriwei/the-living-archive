import { useState } from 'react'
import EmailPassword from './EmailPassword'

export default function Login({ onAuthChange }) {
  const [isSignUp, setIsSignUp] = useState(false)

  const handleCreateAccountClick = () => {
    setIsSignUp(true)
  }

  const handleSignInClick = () => {
    setIsSignUp(false)
  }

  const handleAuthentication = () => {
    console.log('AUTHENTICATING')
    onAuthChange(true)
  }

  return (
    <div className='gap-y-4 flex flex-col px-4 md:px-0 text-english-violet'>
      <div className='flex flex-col gap-y-2'>
        <h3 className='text-3xl font-bold'>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h3>
        <EmailPassword
          isSignUp={isSignUp}
          onAuthenticate={handleAuthentication}
        />
        <p
          className='underline cursor-pointer'
          onClick={isSignUp ? handleSignInClick : handleCreateAccountClick}
        >
          {isSignUp ? 'Existing user? Back to sign in' : 'Create an Account'}
        </p>
      </div>
    </div>
  )
}
