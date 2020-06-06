import React, { Component, createRef } from 'react'
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api'
import { Button, Dialog, DialogTitle, DialogActions, withStyles } from '@material-ui/core'

const markerIcon = require('../../resources/marker.png')
const targetIcon = require('../../resources/target.png')

const useStyles = {
  mapContainer: {
    height: '400px',
    width: '500px',
    margin: '10px'
  }
}

const mapContainerStyle = {
  height: '100%',
  width: '100%'
}

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

const polylineOptions = {
  strokeColor: '#f5b342',
  strokeOpacity: 0.8,
  strokeWeight: 2
}

class ResultDialog extends Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
    this.state = {
      open: false,
      distance: 0,
      selectedLocation: { lat: 0, lng: 0 },
      initialLocation: { lat: 0, lng: 0 }
    }
    this.googleMap = createRef()

    this.handleMapLoad = this.handleMapLoad.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
  }

  calculateDistance (location1, location2) {
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(location1, location2)
    return Math.round(distance)
  }

  showResult (selectedLocation, initialLocation) {
    const distance = this.calculateDistance(selectedLocation, initialLocation)
    this.setState({
      open: true,
      distance: distance,
      selectedLocation: selectedLocation,
      initialLocation: initialLocation
    })
  }

  handleMapLoad () {
    if (this.googleMap.current) {
      const bounds = new window.google.maps.LatLngBounds()
      bounds.extend(this.state.selectedLocation)
      bounds.extend(this.state.initialLocation)
      this.googleMap.current.state.map.fitBounds(bounds)
    }
  }

  getDistanceString (distance) {
    return distance >= 1000 ? distance / 1000 + ' km' : distance + ' m'
  }

  handleRestart (event) {
    this.setState({
      open: false
    })
    this.props.restart()
  }

  render () {
    return (
      <Dialog
        open={this.state.open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'You are ' + this.getDistanceString(this.state.distance) + ' off!'}</DialogTitle>
        <div className={this.classes.mapContainer}>
          <GoogleMap
            id='result-map'
            ref={this.googleMap}
            onLoad={this.handleMapLoad}
            mapContainerStyle={mapContainerStyle}
            options={mapOptions}
            center={{ lat: 0, lng: 0 }}
            zoom={2}
            clickableIcons={false}
          >
            <Marker
              position={this.state.selectedLocation}
              icon={{ url: markerIcon, scaledSize: { width: 32, height: 32 } }}
            />
            <Marker
              position={this.state.initialLocation}
              icon={{ url: targetIcon, scaledSize: { width: 32, height: 32 }, anchor: { x: 16, y: 16 } }}
            />
            <Polyline
              path={[this.state.selectedLocation, this.state.initialLocation]}
              options={polylineOptions}
            />
          </GoogleMap>
        </div>
        <DialogActions>
          <Button onClick={this.handleRestart} color='primary'>
            New Round
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(useStyles)(ResultDialog)
