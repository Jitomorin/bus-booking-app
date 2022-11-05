import { Alert } from '@mui/material'
import React from 'react'

const Feedback = (message,type) => {
  return (
      <Alert severity={type}>{message}</Alert>
  )
}

export default Feedback