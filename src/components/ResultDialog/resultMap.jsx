import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api'
import CustomColors from '../../resources/color-constants'
import markerIcon from '../../resources/marker.png'
import targetIcon from '../../resources/target.png'

const mapContainerStyle = {
  height: '100%',
  width: '100%'
}

const mapOptions = {
  disableDefaultUI: true,
  minZoom: 1,
  restriction: {
    latLngBounds: {
      north: 85,
      south: -85,
      west: -180,
      east: 180
    },
    strictBounds: false
  }
}

const foregroundPolyline = {
  strokeColor: CustomColors.ACCENT2,
  strokeOpacity: 1,
  strokeWeight: 1,
  zIndex: 51
}

const backgroundPolyline = {
  strokeColor: CustomColors.DARK,
  strokeOpacity: 1,
  strokeWeight: 2,
  zIndex: 50
}

export default function ResultMap ({ initialLocation, selectedLocation }) {
  const googleMap = useRef()
  const marker = useRef()

  const handleOnLoad = () => {
    const bounds = new window.google.maps.LatLngBounds()
    bounds.extend(selectedLocation)
    bounds.extend(initialLocation)
    googleMap.current.state.map.fitBounds(bounds)
  }

  return (
    <GoogleMap
      id='result-map'
      ref={googleMap}
      onLoad={handleOnLoad}
      mapContainerStyle={mapContainerStyle}
      options={mapOptions}
      center={{ lat: 0, lng: 0 }}
      zoom={2}
      clickableIcons={false}
    >
      <Marker
        ref={marker}
        position={selectedLocation}
        icon={{ url: markerIcon, scaledSize: { width: 48, height: 48 } }}
      />
      <Marker
        position={initialLocation}
        icon={{ url: targetIcon, scaledSize: { width: 32, height: 32 }, anchor: { x: 16, y: 16 } }}
      />
      <Polyline
        path={[selectedLocation, initialLocation]}
        options={foregroundPolyline}
      />
      <Polyline
        path={[selectedLocation, initialLocation]}
        options={backgroundPolyline}
      />
    </GoogleMap>
  )
}

ResultMap.propTypes = {
  initialLocation: PropTypes.object,
  selectedLocation: PropTypes.object
}
