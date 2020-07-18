import React, { Component, createRef } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { Button, IconButton, withStyles } from '@material-ui/core'
import { Fullscreen, FullscreenExit } from '@material-ui/icons'
import CustomColors from '../../resources/color-constants'
import MediaQuery from 'react-responsive'

const markerIcon = require('../../resources/marker.png')

const useStyles = theme => ({
  selectionMap: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '300px',
    width: '300px',

    transition: 'all .2s linear',
    zIndex: 10,
    marginBottom: '20px',
    marginRight: '20px',
    '@media (hover: hover)': {
      opacity: '50%',
      '&:hover': {
        opacity: '100%',
        height: '500px',
        width: '500px'
      }
    }
  },
  smallMap: {
    '@media not all and (hover: hover)': {
      height: '300px',
      width: '300px'
    }
  },
  largeMap: {
    '@media not all and (hover: hover)': {
      height: '500px',
      width: '500px'
    }
  },
  mapContainer: {
    position: 'relative',
    height: '100%',
    width: 'auto',
    border: 'solid',
    borderColor: CustomColors.DARK,
    marginBottom: '3px'
  },
  selectionButton: {
    '@media (hover: hover)': {
      '&:hover': {
        background: CustomColors.GRADIENT
      }
    }
  },
  expandMapButton: {
    position: 'absolute',
    backgroundColor: CustomColors.DARK,
    top: 0,
    left: 0,
    marginTop: '2px',
    marginLeft: '2px',
    '&:focus': {
      backgroundColor: CustomColors.DARK
    },
    '&:hover': {
      backgroundColor: CustomColors.DARK
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
      selectedLocation: null,
      isExpanded: false
    })
    this.googleMap.current.state.map.setZoom(2)
    this.googleMap.current.state.map.setCenter(defaultMapCenter)
  }

  render () {
    return (
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
          <MediaQuery query='not all and (hover: hover)'>
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
  }
}

export default withStyles(useStyles, { withTheme: true })(SelectionMap)
