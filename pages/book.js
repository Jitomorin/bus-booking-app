import React from 'react'
import Header from '../components/header'
import { useRouter } from 'next/router'

const Book = () => {
    const router = useRouter()
    const bus=router.query.bus
  return (
      <div className='min-h-screen w-screen'>
          <Header />
          <div className='mx-5'>
              <h1 className='text-4xl text-pink_red m-5'>Book seat</h1>
              <div>
                    <h1 className='text-2xl text-pink_red m-5'>Bus Number Plate: {router.query.bus}</h1>
              </div>
          </div>
    </div>
  )
}

export default Book