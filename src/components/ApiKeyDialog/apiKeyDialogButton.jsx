import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core'

const SET_TEXT = 'Set Api Key'
const CHANGE_TEXT = 'Change Api Key'

export default function ApiKeyDialogButton (props) {
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false)
  const [fieldText, setFieldText] = useState(props.apiKey ? props.apiKey : '')

  const handleClose = () => {
    setApiKeyDialogOpen(false)
  }

  const handleDeveloper = () => {
    setFieldText('')
    handleClose()
    props.setApiKey(null)
  }

  const handleSubmitApiKey = (newApiKey) => {
    props.setApiKey(fieldText)
    handleClose()
  }

  const openApiKeyDialog = () => {
    setApiKeyDialogOpen(true)
  }

  return (
    <div>
      <Button onClick={openApiKeyDialog} color='inherit'>
        {(props.apiKey && CHANGE_TEXT) || SET_TEXT}
      </Button>
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
            defaultValue={fieldText}
            onChange={event => setFieldText(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeveloper}>
            Run in developer mode
          </Button>
          <Button onClick={handleSubmitApiKey} disabled={fieldText.length === 0}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

ApiKeyDialogButton.propTypes = {
  apiKey: PropTypes.string,
  setApiKey: PropTypes.func
}
