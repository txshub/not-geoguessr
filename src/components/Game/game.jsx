import React, { Component, createRef } from 'react'
import StreetView from '../StreetView/streetView'
import SelectionMap from '../SelectionMap/selectionMap'
import NavDrawer from '../NavDrawer/navDrawer'
import ResultDialog from '../ResultDialog/resultDialog'
import LoadingBackdrop from '../LoadingBackdrop/loadingBackdrop'
import generateStreetViewLocation from './generate-streetview-location.js'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      initialLocation: new this.props.googleMapsApi.LatLng(0, 0),
      showBackdrop: false
    }
    this.streetView = createRef()
    this.resultDialog = createRef()
    this.selectionMap = createRef()
    this.loadingBackdrop = createRef()
  }

  componentDidMount () {
    this.resetLocation()
  }

  resetLocation () {
    this.loadingBackdrop.current.toggleBackdrop(true)
    generateStreetViewLocation(this.props.googleMapsApi).then(location => {
      this.setState({
        initialLocation: location
      })
      this.loadingBackdrop.current.toggleBackdrop(false)
      this.selectionMap.current.reset()
    })
  }

  onLocationSelected (selectedLocation) {
    this.resultDialog.current.showResult(selectedLocation, this.state.initialLocation)
  }

  onPanToInitialLocation () {
    this.streetView.current.state.streetViewPanorama.setPosition(this.state.initialLocation)
  }

  onRestart () {
    this.resetLocation()
  }

  render () {
    return (
      <div>
        <NavDrawer panToInitialLocation={() => this.onPanToInitialLocation()} />
        <StreetView location={this.state.initialLocation} streetViewPanoramaRef={this.streetView} />
        <SelectionMap ref={this.selectionMap} locationSelected={location => this.onLocationSelected(location)} />
        <ResultDialog ref={this.resultDialog} restart={() => this.onRestart()} />
        <LoadingBackdrop ref={this.loadingBackdrop} />
      </div>
    )
  }
}
