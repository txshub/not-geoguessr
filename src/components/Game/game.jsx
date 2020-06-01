import React, { Component, createRef } from 'react'
import { Backdrop, CircularProgress, styled } from '@material-ui/core'
import StreetView from '../StreetView/streetView'
import SelectionMap from '../SelectionMap/selectionMap'
import NavDrawer from '../NavDrawer/navDrawer'
import ResultDialog from '../ResultDialog/resultDialog'
import generateStreetViewLocation from './generate-streetview-location.js'

const StyledBackdrop = styled(Backdrop)({
  zIndex: 3000,
  color: '#fff'
})

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
  }

  componentDidMount () {
    this.resetLocation()
  }

  resetLocation () {
    this.setState({
      showBackdrop: true
    })
    generateStreetViewLocation(this.props.googleMapsApi).then(location => {
      this.setState({
        initialLocation: location,
        showBackdrop: false
      })
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
        <StyledBackdrop open={this.state.showBackdrop}>
          <CircularProgress color='inherit' />
        </StyledBackdrop>
      </div>
    )
  }
}
