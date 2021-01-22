import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { Button, IconButton, Fab, makeStyles } from '@material-ui/core'
import { Fullscreen, FullscreenExit } from '@material-ui/icons'
import CustomColors from '../../resources/color-constants'
import MediaQuery from 'react-responsive'
import markerIcon from '../../resources/marker.png'

const useStyles = makeStyles(theme => ({
  selectionMap: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: theme.spacing(1),
    bottom: theme.spacing(2),
    height: '300px',
    width: '300px',
    transition: 'all .2s linear',
    zIndex: 10,
    '@media (any-hover: hover) and (pointer: fine)': {
      opacity: '50%',
      '&:hover': {
        opacity: '100%',
        height: '500px',
        width: '500px'
      }
    }
  },
  smallMap: {
    '@media (any-hover: none), (pointer: coarse)': {
      height: '300px',
      width: '300px'
    },
    '@media (max-width: 600px)': {
      display: 'none'
    }
  },
  largeMap: {
    '@media (any-hover: none), (pointer: coarse)': {
      height: '500px',
      width: '500px'
    },
    '@media (max-width: 600px)': {
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      zIndex: 2000
    }
  },
  mapContainer: {
    position: 'relative',
    height: '100%',
    width: 'auto',
    border: 'solid',
    borderColor: CustomColors.DARK,
    marginBottom: '3px',
    '@media (max-width: 600px)': {
      marginBottom: '0px',
      border: 'none'
    }
  },
  selectionButton: {
    '@media (any-hover: hover) and (pointer: fine)': {
      '&:hover': {
        background: CustomColors.GRADIENT
      }
    },
    '@media (max-width: 600px)': {
      height: '50px',
      borderRadius: '0px'
    }
  },
  expandMapButton: {
    position: 'absolute',
    backgroundColor: CustomColors.DARK,
    top: theme.spacing(1),
    left: theme.spacing(1),
    '&:focus': {
      backgroundColor: CustomColors.DARK
    },
    '&:hover': {
      backgroundColor: CustomColors.DARK
    }
  },
  fab: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(4),
    background: CustomColors.GRADIENT
  }
}))

const mapOptions = {
  disableDefaultUI: true,
  minZoom: 1,
  draggableCursor: 'crosshair',
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

const mapContainerStyle = {
  height: '100%',
  width: '100%'
}

const defaultMapCenter = { lat: 45, lng: 25 }

export default function SelectionMap ({ locationSelected, endOfRound }) {
  const classes = useStyles()
  const [isSelected, setSelected] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState()
  const [isExpanded, setExpanded] = useState(false)
  const googleMap = useRef()

  useEffect(() => {
    if (!endOfRound && googleMap.current.state.map) {
      setSelected(false)
      setSelectedLocation(null)
      googleMap.current.state.map.setZoom(2)
      googleMap.current.state.map.panTo(defaultMapCenter)
    }
  }, [endOfRound])

  const handleMapClick = e => {
    setSelected(true)
    setSelectedLocation(e.latLng)
    googleMap.current.state.map.panTo(e.latLng)
  }

  const handleLocationSelected = () => {
    setExpanded(false)
    locationSelected(selectedLocation)
  }

  const handleExpand = () => {
    setExpanded(!isExpanded)
  }

  const selectionMap = (
    <div className={`${classes.selectionMap} ${isExpanded ? classes.largeMap : classes.smallMap}`}>
      <div className={classes.mapContainer}>
        <GoogleMap
          id='selection-map'
          ref={googleMap}
          mapContainerStyle={mapContainerStyle}
          zoom={2}
          center={defaultMapCenter}
          clickableIcons={false}
          options={mapOptions}
          onClick={handleMapClick}
        >
          <Marker
            visible={isSelected}
            position={selectedLocation}
            icon={{ url: markerIcon, scaledSize: { width: 48, height: 48 } }}
            clickable={false}
          />
        </GoogleMap>
        <MediaQuery query='(any-hover: none), (pointer: coarse)'>
          <IconButton
            className={classes.expandMapButton}
            onClick={handleExpand}
            color='secondary'
            size='small'
          >
            {
              isExpanded
                ? <FullscreenExit className={classes.expandIcon} />
                : <Fullscreen className={classes.expandIcon} />
            }
          </IconButton>
        </MediaQuery>
      </div>
      <Button
        className={classes.selectionButton}
        onClick={handleLocationSelected}
        disabled={!isSelected}
        variant='contained'
        color='secondary'
      >
        Select Location
      </Button>
    </div>
  )

  const mapFab = (
    <Fab className={classes.fab} onClick={handleExpand}>
      <img src={markerIcon} alt='' width='48' height='48' />
    </Fab>
  )

  return (
    <div>
      <MediaQuery maxDeviceWidth={600}>
        {!isExpanded && mapFab}
      </MediaQuery>
      {selectionMap}
    </div>
  )
}

SelectionMap.propTypes = {
  locationSelected: PropTypes.func,
  endOfRound: PropTypes.bool
}
