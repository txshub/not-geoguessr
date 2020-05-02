import React from 'react'
import PropTypes from 'prop-types'
import { LoadScript, GoogleMap, StreetViewPanorama } from '@react-google-maps/api'
import './streetView.scss'

const streetViewInitialLocation = {
  lat: 51.072776,
  lng: -1.313851
}

export default function StreetView (props) {
  const streetViewOptions = {
    addressControl: false,
    fullscreenControl: false,
    enableCloseButton: false,
    linksControl: false
  }
  const mapContainerStyle = {
    borderRadius: '20px',
    height: 'inherit',
    width: 'inherit'
  }

  return (
    <div className='street-view-container'>
      <LoadScript id='script-loader' googleMapsApiKey={props.apiKey}>
        <GoogleMap
          id='test-map'
          mapContainerStyle={mapContainerStyle}
          zoom={7}
          center={streetViewInitialLocation}
        >
          <StreetViewPanorama
            position={streetViewInitialLocation}
            visible
            options={streetViewOptions}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

StreetView.propTypes = {
  apiKey: PropTypes.string
}
