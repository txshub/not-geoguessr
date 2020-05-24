import React, { Component, createRef } from 'react'
import StreetView from '../StreetView/streetView'
import SelectionMap from '../SelectionMap/selectionMap'
import NavDrawer from '../NavDrawer/navDrawer'
import ResultDialog from '../ResultDialog/resultDialog'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      initialLocation: this.generateLocation()
    }
    this.streetView = createRef()
    this.resultDialog = createRef()
  }

  generateLocation () {
    console.log('NEW LOCATION')
    // lat: Math.random() * (90 + 90) - 90,
    // lng: Math.random() * (180 + 180) - 180
    return new window.google.maps.LatLng(51.072776, -1.313851)
  }

  calculateDistance (location1, location2) {
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(location1, location2)
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
    this.setState({
      initialLocation: this.generateLocation()
    })
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
