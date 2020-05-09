import React from 'react'
import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  '@global': {
    'a[href^="http://maps.google.com/maps"]': { display: 'none !important' },
    'a[href^="https://maps.google.com/maps"]': { display: 'none !important' }
  }
})

const streetViewInitialLocation = {
  // lat: Math.random() * (90 + 90) - 90,
  // lng: Math.random() * (180 + 180) - 180
  lat: 51.072776,
  lng: -1.313851
}

const streetViewMapStyles = {
  height: '100vh',
  zIndex: 0
}

export default function StreetView (props) {
  useStyles()

  const streetViewOptions = {
    addressControl: false,
    fullscreenControl: false,
    enableCloseButton: false,
    linksControl: false,
    showRoadLabels: false,
    panControl: true, // Otherwise, it disappears on small screens
    panControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_BOTTOM // Find a cleaner way to do this
    },
    zoomControl: true,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_BOTTOM
    }
  }

  console.log('WHY')
  return (
    <GoogleMap
      mapContainerStyle={streetViewMapStyles}
      id='streetview-map'
      zoom={7}
      center={streetViewInitialLocation}
    >
      <StreetViewPanorama
        position={streetViewInitialLocation}
        visible
        options={streetViewOptions}
      />
    </GoogleMap>
  )
}

StreetView.propTypes = {}
