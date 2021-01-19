import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import StreetView from '../StreetView/streetView'
import SelectionMap from '../SelectionMap/selectionMap'
import NavDrawer from '../NavDrawer/navDrawer'
import ResultDialog from '../ResultDialog/resultDialog'
import LoadingBackdrop from '../LoadingBackdrop/loadingBackdrop'
import generateStreetViewLocation from '../../utils/generate-streetview-location'

export default function Game ({ googleMapsApi }) {
  const [initialLocation, setInitialLocation] = useState(new googleMapsApi.LatLng(0, 0))
  const [selectedLocation, setSelectedLocation] = useState()
  const [showBackdrop, setShowBackdrop] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [distance, setDistance] = useState(0)
  const streetView = useRef()
  const selectionMap = useRef()

  useEffect(() => {
    generateStreetViewLocation(googleMapsApi).then(location => {
      setInitialLocation(location)
      setShowBackdrop(false)
    })
  }, [])

  const onLocationSelected = selectedLocation => {
    const distance = googleMapsApi.geometry.spherical.computeDistanceBetween(selectedLocation, initialLocation)
    setSelectedLocation(selectedLocation)
    setShowResult(true)
    setDistance(Math.round(distance))
  }

  const onPanToInitialLocation = () => {
    streetView.current.state.streetViewPanorama.setPosition(initialLocation)
  }

  const onRestart = () => {
    setShowResult(false)
    setShowBackdrop(true)
    generateStreetViewLocation(googleMapsApi).then(location => {
      setInitialLocation(location)
      setShowBackdrop(false)
    })
    selectionMap.current.reset()
  }

  return (
    <div>
      <NavDrawer panToInitialLocation={onPanToInitialLocation} />
      <StreetView location={initialLocation} streetViewPanoramaRef={streetView} />
      <SelectionMap ref={selectionMap} locationSelected={onLocationSelected} />
      <ResultDialog
        open={showResult}
        initialLocation={initialLocation}
        selectedLocation={selectedLocation}
        distance={distance}
        restart={onRestart}
      />
      <LoadingBackdrop open={showBackdrop} />
    </div>
  )
}

Game.propTypes = {
  googleMapsApi: PropTypes.object
}
