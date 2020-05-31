import React, { Component, createRef } from 'react'
import StreetView from '../StreetView/streetView'
import SelectionMap from '../SelectionMap/selectionMap'
import NavDrawer from '../NavDrawer/navDrawer'
import ResultDialog from '../ResultDialog/resultDialog'
import { generateStreetViewLocation } from './game-utils'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      initialLocation: new this.props.googleMapsApi.LatLng(0, 0)
    }
    this.generateLocation()
    this.streetView = createRef()
    this.resultDialog = createRef()
  }

  generateLocation () {
    generateStreetViewLocation(this.props.googleMapsApi).then(location => {
      this.setState({
        initialLocation: location
      })
    })
  }

  calculateDistance (location1, location2) {
    const distance = this.props.googleMapsApi.geometry.spherical.computeDistanceBetween(location1, location2)
    return Math.round(distance)
  }

  onLocationSelected (selectedLocation) {
    const distance = this.calculateDistance(selectedLocation, this.state.initialLocation)
    this.resultDialog.current.showResult(distance)
  }

  onPanToInitialLocation () {
    this.streetView.current.state.streetViewPanorama.setPosition(this.state.initialLocation)
  }

  onRestart () {
    this.generateLocation()
  }

  render () {
    return (
      <div>
        <NavDrawer panToInitialLocation={() => this.onPanToInitialLocation()} />
        <StreetView location={this.state.initialLocation} streetViewPanoramaRef={this.streetView} />
        <SelectionMap locationSelected={location => this.onLocationSelected(location)} />
        <ResultDialog ref={this.resultDialog} restart={() => this.onRestart()} />
      </div>
    )
  }
}
