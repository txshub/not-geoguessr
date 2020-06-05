import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  '@global': {
    'a[href^="http://maps.google.com/maps"]': { display: 'none !important' },
    'a[href^="https://maps.google.com/maps"]': { display: 'none !important' }
  }
})

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
    panControl: true,
    panControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_BOTTOM
    },
    zoomControl: true,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_BOTTOM
    },
    zoom: 1.4
  }

  return (
    <GoogleMap
      mapContainerStyle={streetViewMapStyles}
      id='streetview-map'
      zoom={7}
      center={{ lat: 0, lng: 0 }}
    >
      <StreetViewPanorama
        ref={props.streetViewPanoramaRef}
        position={{ lat: props.location.lat(), lng: props.location.lng() }}
        visible
        options={streetViewOptions}
      />
    </GoogleMap>
  )
}

StreetView.propTypes = {
  location: PropTypes.object,
  streetViewPanoramaRef: PropTypes.object
}
