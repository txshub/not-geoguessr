import React, { useRef } from 'react'
import StreetView from '../StreetView/streetView'
import SelectionMap from '../SelectionMap/selectionMap'
import NavDrawer from '../NavDrawer/navDrawer'

export default function Game () {
  const calculateDistance = (location1, location2) => {
    let distance = window.google.maps.geometry.spherical.computeDistanceBetween(location1, location2)
    distance = Math.round(distance)
    return {
      distance: distance,
      distanceString: distance >= 1000 ? distance / 1000 + ' km' : distance + ' m'
    }
  }

  const streetView = useRef()
  // lat: Math.random() * (90 + 90) - 90,
  // lng: Math.random() * (180 + 180) - 180
  const streetViewInitialLocation = new window.google.maps.LatLng(51.072776, -1.313851)

  const handleLocationSelected = selectedLocation => {
    const { distance, distanceString } = calculateDistance(selectedLocation, streetViewInitialLocation)
    console.log('The distance is: ' + distance)
    console.log('The distanceString is: ' + distanceString)
  }

  const handlePanToInitialLocation = () => {
    streetView.current.state.streetViewPanorama.setPosition(streetViewInitialLocation)
  }

  return (
    <div>
      <NavDrawer panToInitialLocation={handlePanToInitialLocation} />
      <StreetView location={streetViewInitialLocation} streetViewPanoramaRef={streetView} />
      <SelectionMap locationSelected={handleLocationSelected} />
    </div>
  )
}
