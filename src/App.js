import React from 'react'
import './App.scss'
import StreetView from '../src/components/StreetView/streetView'
import { Typography, Container } from '@material-ui/core'

function App () {
  return (
    <div className='App'>
      <Typography className='typography' align='center' variant='h2'>Not Geoguessr</Typography>
      <Container className='main-container' maxWidth='lg'>
        <StreetView />
      </Container>
    </div>
  )
}

export default App
