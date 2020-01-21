import React from 'react'

const FailedUpdatedUser = () => {
  return (
    <div className='alert alert-danger mt-3 shadow' role='alert'>
      <span> Failed update, email address is already being used. Please use a unique email.</span>
    </div>
  )
}

export default FailedUpdatedUser
