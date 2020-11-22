import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import StreetView from '../StreetView/streetView'
import SelectionMap from '../SelectionMap/selectionMap'
import NavDrawer from '../NavDrawer/navDrawer'
import ResultDialog from '../ResultDialog/resultDialog'
import LoadingBackdrop from '../LoadingBackdrop/loadingBackdrop'
import generateStreetViewLocation from '../../utils/generate-streetview-location'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      initialLocation: new this.props.googleMapsApi.LatLng(0, 0),
      showBackdrop: false,
      showResult: false,
      distance: 0
    }
    this.streetView = createRef()
    this.selectionMap = createRef()

    this.onPanToInitialLocation = this.onPanToInitialLocation.bind(this)
    this.onLocationSelected = this.onLocationSelected.bind(this)
    this.onRestart = this.onRestart.bind(this)
  }

  componentDidMount () {
    this.resetLocation()
  }

  resetLocation () {
    this.setState({ showBackdrop: true })
    generateStreetViewLocation(this.props.googleMapsApi).then(location => {
      this.setState({
        initialLocation: location,
        showBackdrop: false
      })
    })
  }

  onLocationSelected (selectedLocation) {
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(selectedLocation, this.state.initialLocation)
    this.setState({
      selectedLocation: selectedLocation,
      showResult: true,
      distance: Math.round(distance)
    })
  }

  onPanToInitialLocation () {
    this.streetView.current.state.streetViewPanorama.setPosition(this.state.initialLocation)
  }

  onRestart () {
    this.setState({
      showResult: false
    })
    this.resetLocation()
    this.selectionMap.current.reset()
  }

  render () {
    return (
      <div>
        <NavDrawer panToInitialLocation={this.onPanToInitialLocation} />
        <StreetView location={this.state.initialLocation} streetViewPanoramaRef={this.streetView} />
        <SelectionMap ref={this.selectionMap} locationSelected={this.onLocationSelected} />
        <ResultDialog
          open={this.state.showResult}
          initialLocation={this.state.initialLocation}
          selectedLocation={this.state.selectedLocation}
          distance={this.state.distance}
          restart={this.onRestart}
        />
        <LoadingBackdrop open={this.state.showBackdrop} />
      </div>
    )
  }
}

Game.propTypes = {
  googleMapsApi: PropTypes.object
}
