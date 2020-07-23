import React, { Component, createRef } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { Button, IconButton, withStyles, Fab } from '@material-ui/core'
import { Fullscreen, FullscreenExit } from '@material-ui/icons'
import CustomColors from '../../resources/color-constants'
import MediaQuery from 'react-responsive'

const markerIcon = require('../../resources/marker.png')

const useStyles = theme => ({
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
})

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

class SelectionMap extends Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
    this.state = {
      selected: false,
      selectedLocation: null,
      isExpanded: false
    }
    this.googleMap = createRef()

    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleLocationSelected = this.handleLocationSelected.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
  }

  handleMapClick (event) {
    this.setState({
      selected: true,
      selectedLocation: event.latLng
    })
    this.googleMap.current.state.map.panTo(event.latLng)
  }

  handleLocationSelected () {
    this.setState({
      isExpanded: false
    })
    this.props.locationSelected(this.state.selectedLocation)
  }

  handleExpand () {
    this.setState(previousState => ({
      isExpanded: !previousState.isExpanded
    }))
  }

  reset () {
    this.setState({
      selected: false,
      selectedLocation: null
    })
    this.googleMap.current.state.map.setZoom(2)
    this.googleMap.current.state.map.setCenter(defaultMapCenter)
  }

  render () {
    const selectionMap = (
      <div className={`${this.classes.selectionMap} ${this.state.isExpanded ? this.classes.largeMap : this.classes.smallMap}`}>
        <div className={this.classes.mapContainer}>
          <GoogleMap
            id='selection-map'
            ref={this.googleMap}
            mapContainerStyle={mapContainerStyle}
            zoom={2}
            center={defaultMapCenter}
            clickableIcons={false}
            options={mapOptions}
            onClick={this.handleMapClick}
          >
            <Marker
              visible={this.state.selected}
              position={this.state.selectedLocation}
              icon={{ url: markerIcon, scaledSize: { width: 48, height: 48 } }}
              clickable={false}
            />
          </GoogleMap>
          <MediaQuery query='(any-hover: none), (pointer: coarse)'>
            <IconButton
              className={this.classes.expandMapButton}
              onClick={this.handleExpand}
              color='secondary'
              size='small'
            >
              {
                this.state.isExpanded
                  ? <FullscreenExit className={this.classes.expandIcon} />
                  : <Fullscreen className={this.classes.expandIcon} />
              }
            </IconButton>
          </MediaQuery>
        </div>
        <Button
          className={this.classes.selectionButton}
          onClick={this.handleLocationSelected}
          disabled={!this.state.selected}
          variant='contained'
          color='secondary'
        >
          Select Location
        </Button>
      </div>
    )

    const mapFab = (
      <Fab className={this.classes.fab} onClick={this.handleExpand}>
        <img src={markerIcon} alt='' width='48' height='48' />
      </Fab>
    )

    return (
      <div>
        <MediaQuery maxDeviceWidth={600}>
          {!this.state.isExpanded && mapFab}
        </MediaQuery>
        {selectionMap}
      </div>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(SelectionMap)
