import React from 'react'
import { GoogleMap } from '@react-google-maps/api'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  mapCcontainer: {
    height: '300px',
    width: '300px',
    position: 'absolute',
    right: 0,
    bottom: 0,
    opacity: '60%',
    border: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.8)',
    transition: 'all .2s linear',
    '&:hover': {
      height: '500px',
      width: '500px',
      opacity: '100%',
      borderColor: 'rgba(0, 0, 0, 0.8)'
    }
  }
})

export default function SelectionMap (props) {
  const classes = useStyles()

  const mapOptions = {
    disableDefaultUI: true,
    minZoom: 1,
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

  return (
    <div className={classes.mapCcontainer}>
      <GoogleMap
        id='selection-map'
        mapContainerStyle={mapContainerStyle}
        zoom={2}
        center={{ lat: 0, lng: 0 }}
        clickableIcons={false}
        options={mapOptions}
      />
    </div>
  )
}

SelectionMap.propTypes = {}
