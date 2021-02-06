import React from 'react'
import ResultMap from '../resultMap'
import { LoadScript } from '@react-google-maps/api'
import LoadingBackdrop from '../../LoadingBackdrop/loadingBackdrop'

export default {
  title: 'ResultMap',
  component: ResultMap
}

export const Default = (props) =>
  <LoadScript
    id='script-loader'
    libraries={['geometry']}
    loadingElement={<LoadingBackdrop open />}
  >
    <div style={{
      width: 500,
      height: 300,
      margin: 'auto'
    }}
    >
      <ResultMap {...props} />
    </div>
  </LoadScript>
Default.args = {
  initialLocation: { lat: 45, lng: 25 },
  selectedLocation: { lat: 0, lng: 0 }
}
