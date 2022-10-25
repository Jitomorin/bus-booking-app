import React, { useContext } from 'react'
import { authContext } from '../context/UserContext'

const Home = () => {
  const {currentUser}=useContext(authContext)
  return (
      <div>
      <h1>{ currentUser.uid}</h1>
      
    </div>
  )
}

export default Home