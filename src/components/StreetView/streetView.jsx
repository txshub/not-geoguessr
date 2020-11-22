import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api'
import { makeStyles, useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles({
  '@global': {
    'a[href^="http://maps.google.com/maps"]': { display: 'none !important' },
    'a[href^="https://maps.google.com/maps"]': { display: 'none !important' }
  }
})

export default function StreetView ({ streetViewPanoramaRef, location }) {
  useStyles()
  const isTouchScreen = useMediaQuery('(anyHover: none), (pointer: coarse)')

  const streetViewMapStyles = {
    height: isTouchScreen ? window.innerHeight : '100vh',
    zIndex: 0
  }

  const streetViewOptions = {
    addressControl: false,
    fullscreenControl: false,
    enableCloseButton: false,
    linksControl: false,
    motionTracking: false,
    motionTrackingControl: false,
    showRoadLabels: false,
    panControl: true,
    panControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_BOTTOM
    },
    zoomControl: true,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_BOTTOM
    },
    zoom: 1.3
  }

  return (
    <GoogleMap
      mapContainerStyle={streetViewMapStyles}
      id='streetview-map'
      zoom={7}
      center={{ lat: 0, lng: 0 }}
    >
      <StreetViewPanorama
        ref={streetViewPanoramaRef}
        position={{ lat: location.lat(), lng: location.lng() }}
        visible
        options={streetViewOptions}
      />
    </GoogleMap>
  )
}

StreetView.propTypes = {
  streetViewPanoramaRef: PropTypes.object,
  location: PropTypes.object
}
