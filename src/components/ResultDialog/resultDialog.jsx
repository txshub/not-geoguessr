import React, { Component, createRef } from 'react'
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api'
import { Button, Dialog, DialogTitle, DialogActions, withStyles } from '@material-ui/core'
import CustomColors from '../../resources/color-constants'

const markerIcon = require('../../resources/marker.png')
const targetIcon = require('../../resources/target.png')

const useStyles = theme => ({
  mapContainer: {
    height: '400px',
    width: '500px',
    margin: '10px'
  },
  dialogContent: {
    backgroundColor: CustomColors.DARK
  },
  dialogTitle: {
    width: 'fit-content',
    background: CustomColors.GRADIENT,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  },
  newRoundButton: {
    color: CustomColors.ACCENT1,
    backgroundColor: CustomColors.DARK,
    transition: '0.3s',
    '&:hover': {
      color: CustomColors.DARK,
      backgroundColor: CustomColors.ACCENT1
    }
  }
})

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

class ResultDialog extends Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
    this.googleMap = createRef()

    this.handleMapLoad = this.handleMapLoad.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
  }

  handleMapLoad () {
    if (this.googleMap.current) {
      const bounds = new window.google.maps.LatLngBounds()
      bounds.extend(this.props.selectedLocation)
      bounds.extend(this.props.initialLocation)
      this.googleMap.current.state.map.fitBounds(bounds)
    }
  }

  getDistanceString (distance) {
    return distance >= 1000 ? distance / 1000 + ' km' : distance + ' m'
  }

  handleRestart (event) {
    this.props.restart()
  }

  render () {
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <div className={this.classes.dialogContent}>
          <DialogTitle className={this.classes.dialogTitle} id='alert-dialog-title'>{'You are ' + this.getDistanceString(this.props.distance) + ' off!'}</DialogTitle>
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
                position={this.props.selectedLocation}
                icon={{ url: markerIcon, scaledSize: { width: 48, height: 48 } }}
              />
              <Marker
                position={this.props.initialLocation}
                icon={{ url: targetIcon, scaledSize: { width: 32, height: 32 }, anchor: { x: 16, y: 16 } }}
              />
              <Polyline
                path={[this.props.selectedLocation, this.props.initialLocation]}
                options={foregroundPolyline}
              />
              <Polyline
                path={[this.props.selectedLocation, this.props.initialLocation]}
                options={backgroundPolyline}
              />
            </GoogleMap>
          </div>
          <DialogActions>
            <Button className={this.classes.newRoundButton} onClick={this.handleRestart} color='primary'>
              New Round
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(ResultDialog)
