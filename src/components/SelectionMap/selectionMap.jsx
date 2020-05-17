import React, { useState, useRef } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  mapContainer: {
    height: '300px',
    width: '300px',
    position: 'absolute',
    right: 0,
    bottom: 0,
    opacity: '50%',
    border: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.8)',
    transition: 'all .2s linear',
    '&:hover': {
      height: '500px',
      width: '500px',
      opacity: '100%',
      borderColor: 'rgba(0, 0, 0, 1)'
    }
  }
})

const mapOptions = {
  disableDefaultUI: true,
  minZoom: 1,
  draggableCursor: 'crosshair',
  restriction: {
    latLngBounds: {
      north: 85, // For some reason this is not 90 in google maps
      south: -85,
      west: -180,
      east: 180
    },
    strictBounds: false
  }
}

const mapContainerStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  right: '0',
  bottom: '0',
  zIndex: '10'
}

export default function SelectionMap (props) {
  const classes = useStyles()
  const [selected, setSelected] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState(null)

  const googleMap = useRef()

  const handleMapClick = event => {
    if (!selected) {
      setSelected(true)
    }
    setSelectedPosition(event.latLng)
    googleMap.current.state.map.panTo(event.latLng)
  }

  return (
    <div className={classes.mapContainer}>
      <GoogleMap
        id='selection-map'
        ref={googleMap}
        mapContainerStyle={mapContainerStyle}
        zoom={2}
        center={{ lat: 0, lng: 0 }}
        clickableIcons={false}
        options={mapOptions}
        onClick={handleMapClick}
      >
        <Marker
          visible={selected}
          position={selectedPosition}
          animation={1}
          clickable={false}
        />
      </GoogleMap>
    </div>
  )
}

SelectionMap.propTypes = {}