import React from 'react'
import LoadingSpinner from './LoadingSpinner'

const LoadingPage = () => {
  return (
    <div className='absolute top-0 right-0 flex h-screen w-screen justify-center items-center'>
        <LoadingSpinner size={60} />
    </div>
  )
}

export default LoadingPage