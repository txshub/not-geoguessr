import React from 'react'
import ResultDialog from '../resultDialog'
import { LoadScript } from '@react-google-maps/api'
import LoadingBackdrop from '../../LoadingBackdrop/loadingBackdrop'
import { action } from '@storybook/addon-actions'

export default {
  title: 'ResultDialog',
  component: ResultDialog
}

export const Default = (props) =>
  <LoadScript
    id='script-loader'
    libraries={['geometry']}
    loadingElement={<LoadingBackdrop open />}
  >
    <ResultDialog {...props} />
  </LoadScript>
Default.args = {
  initialLocation: { lat: 45, lng: 25 },
  selectedLocation: { lat: 0, lng: 0 },
  distance: 5563.445,
  open: true,
  restart: action('restart')
}
