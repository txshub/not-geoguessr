import React from 'react'
import { LoadScript } from '@react-google-maps/api'
import StreetView from '../src/components/StreetView/streetView'
import SelectionMap from '../src/components/SelectionMap/selectionMap'
import DrawerButton from '../src/components/DrawerButton/drawerButton'

export default function App () {
  // The API key appears in the call to the Google Maps API, and this is something enforced by Google.
  // So hiding it is futile.
  // However, there are restrictions in place for this key.
  const apiKey = 'AIzaSyAvSjPZw74KA5TCZ_BniFLVxSERndb8S3A'

  const game = () => {
    return (
      <LoadScript id='script-loader' googleMapsApiKey={apiKey}>
        <StreetView />
        <SelectionMap />
      </LoadScript>
    )
  }
  return (
    <div className='App'>
      <DrawerButton />
      {game()}
    </div>
  )
}
