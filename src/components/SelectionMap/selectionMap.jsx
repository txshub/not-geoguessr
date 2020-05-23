import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  selectionMap: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '300px',
    width: '300px',
    opacity: '50%',
    transition: 'all .2s linear',
    zIndex: 10,
    marginBottom: '20px',
    marginRight: '20px',
    '&:hover': {
      opacity: '100%',
      height: '500px',
      width: '500px'
    }
  },
  mapContainer: {
    position: 'relative',
    height: '100%',
    width: 'auto',
    border: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    marginBottom: '3px'
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
  width: '100%'
}

export default function SelectionMap (props) {
  const classes = useStyles()
  const [selected, setSelected] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)

  const googleMap = useRef()

  const handleMapClick = event => {
    if (!selected) {
      setSelected(true)
    }
    setSelectedLocation(event.latLng)
    googleMap.current.state.map.panTo(event.latLng)
  }

  const handleLocationSelected = event => {
    props.locationSelected(selectedLocation)
  }

  return (
    <div className={classes.selectionMap}>
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
            position={selectedLocation}
            clickable={false}
          />
        </GoogleMap>
      </div>
      <Button
        onClick={handleLocationSelected}
        style={{ backgroundColor: 'red' }}
        disabled={!selected}
      >
          Select Location
      </Button>
    </div>

  )
}

SelectionMap.propTypes = {
  locationSelected: PropTypes.func
}
