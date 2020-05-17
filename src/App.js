import React from 'react'
import { LoadScript } from '@react-google-maps/api'
import StreetView from '../src/components/StreetView/streetView'
import SelectionMap from '../src/components/SelectionMap/selectionMap'
import DrawerButton from '../src/components/DrawerButton/drawerButton'

export default function App () {
  const apiKey = 'AIzaSyDQptNBaV52HQeTOzFZLS2-8YWTVv-3Rak'

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
