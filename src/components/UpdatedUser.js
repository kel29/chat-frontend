import React from 'react'

const UpdatedUser = () => {

  return (
    <div className='alert alert-success mt-3 shadow' roll="alert" >
      <span> Updated! Your new username is {JSON.parse(localStorage.getItem('currentUser'))['name']} </span>
      <span> and your email is {JSON.parse(localStorage.getItem('currentUser'))['email']}</span>
    </div>
  )
}

export default UpdatedUser
