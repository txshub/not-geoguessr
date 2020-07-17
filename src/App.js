import React, { useState } from 'react'
import { LoadScript } from '@react-google-maps/api'
import Game from '../src/components/Game/game'
import LoadingBackdrop from '../src/components/LoadingBackdrop/loadingBackdrop'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import CustomColors from './resources/color-constants'

const libraries = ['geometry']

const themeInstance = createMuiTheme({
  palette: {
    type: 'dark',
    action: {
      disabledBackground: '#313131',
      disabled: '#AAAAAA'
    },
    background: { default: CustomColors.DARK },
    primary: { main: CustomColors.ACCENT1 },
    secondary: { main: CustomColors.ACCENT2 }
  }
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
