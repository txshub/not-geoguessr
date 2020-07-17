import React, { Component, createRef } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { Button, withStyles } from '@material-ui/core'
import CustomColors from '../../resources/color-constants'

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

class SelectionMap extends Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
    this.state = {
      selected: false,
      selectedLocation: null
    }
    this.googleMap = createRef()

    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleLocationSelected = this.handleLocationSelected.bind(this)
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

  reset () {
    this.setState({
      selected: false,
      selectedLocation: null
    })
    this.googleMap.current.state.map.setZoom(2)
  }

  render () {
    return (
      <div className={this.classes.selectionMap}>
        <div className={this.classes.mapContainer}>
          <GoogleMap
            id='selection-map'
            ref={this.googleMap}
            mapContainerStyle={mapContainerStyle}
            zoom={2}
            center={{ lat: 45, lng: 25 }}
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
