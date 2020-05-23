import React from 'react'
import { LoadScript } from '@react-google-maps/api'
import Game from '../src/components/Game/game'

export default function App () {
  // The API key appears in the call to the Google Maps API, and this is something enforced by Google.
  // So hiding it is futile.
  // However, there are restrictions in place for this key.
  const apiKey = process.env.NODE_ENV === 'production' ? 'AIzaSyAvSjPZw74KA5TCZ_BniFLVxSERndb8S3A' : null

  return (
    <div className='App'>
      <LoadScript id='script-loader' googleMapsApiKey={apiKey} libraries={['geometry']}>
        <Game />
      </LoadScript>
    </div>
  )
}
