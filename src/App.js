import React, { useState } from 'react'
import { LoadScript } from '@react-google-maps/api'
import Game from '../src/components/Game/game'
import LoadingBackdrop from '../src/components/LoadingBackdrop/loadingBackdrop'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

const libraries = ['geometry']

const themeInstance = createMuiTheme({
  background: '#212121',
  text: '#FFFFFF',
  primary: '#E76171',
  secondary: '#A5EB4B',
  backdrop: '#FFFFFF',
  gradient: '-webkit-linear-gradient(45deg, rgba(214,73,96,1) 0%, rgba(165,235,75,1) 100%)'
})

export default function App () {
  // The API key appears in the call to the Google Maps API, and this is something enforced by Google.
  // So hiding it is futile.
  // However, there are restrictions in place for this key.
  const apiKey = process.env.NODE_ENV === 'production' ? 'AIzaSyAvSjPZw74KA5TCZ_BniFLVxSERndb8S3A' : null
  const [googleMapsApi, setGoogleMapsApi] = useState(null)

  const onLoad = () => {
    setGoogleMapsApi(window.google.maps)
  }

  return (
    <ThemeProvider theme={themeInstance}>
      <LoadScript
        id='script-loader'
        googleMapsApiKey={apiKey}
        libraries={libraries}
        onLoad={onLoad}
        loadingElement={<LoadingBackdrop open />}
      >
        {googleMapsApi && <Game googleMapsApi={googleMapsApi} />}
      </LoadScript>
    </ThemeProvider>
  )
}
