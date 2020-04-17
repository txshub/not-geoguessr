import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { LoadScript, GoogleMap, StreetViewPanorama } from '@react-google-maps/api'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core'
import './streetView.scss'

const streetViewInitialLocation = {
  lat: 51.072776,
  lng: -1.313851
}

export default function StreetView (props) {
  const [apiKey, setApiKey] = useState(props.apiKey)
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(props.apiKey === undefined)
  const [developerMode, setDeveloperMode] = useState(false)
  const [fieldText, setFieldText] = useState('')

  const streetView = () => {
    const streetViewOptions = {
      addressControl: false,
      fullscreenControl: false,
      enableCloseButton: false,
      linksControl: false
    }
    const mapContainerStyle = {
      borderRadius: '20px',
      height: 'inherit',
      width: 'inherit'
    }
    return (
      <LoadScript id='script-loader' googleMapsApiKey={apiKey}>
        <GoogleMap
          id='test-map'
          mapContainerStyle={mapContainerStyle}
          zoom={7}
          center={streetViewInitialLocation}
        >
          <StreetViewPanorama
            position={streetViewInitialLocation}
            visible
            options={streetViewOptions}
          />
        </GoogleMap>
      </LoadScript>
    )
  }

  const hasApiKey = () => {
    console.log(apiKey)
    return apiKey !== undefined
  }

  const handleClose = () => {
    setApiKeyDialogOpen(false)
  }

  const handleDeveloper = () => {
    setDeveloperMode(true)
    handleClose()
  }

  const handleSubmit = () => {
    setApiKey(fieldText)
    handleClose()
  }

  const apiKeyDialog = () => {
    return (
      <Dialog open={apiKeyDialogOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Set Api Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To use Google Maps API, please provide an API key. If the API key is invalid, Street View will start in developer mode.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label='Google Maps API key'
            defaultValue={hasApiKey() ? apiKey : fieldText}
            onChange={event => setFieldText(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeveloper}>
            Start in developer mode
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <div className='street-view-container'>
      {apiKeyDialog()}
      {(developerMode || hasApiKey()) && streetView()}
    </div>
  )
}

StreetView.propTypes = {
  apiKey: PropTypes.string
}
