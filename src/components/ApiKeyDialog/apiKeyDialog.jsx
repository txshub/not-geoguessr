import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core'

export default function ApiKeyDialog (props) {
  const [fieldText, setFieldText] = useState('')

  const handleOnClick = () => {
    props.onSubmitApiKey(fieldText)
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Set Api Key</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To use Google Maps API, please provide an API key. If the API key is invalid, Street View will start in developer mode.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          label='Google Maps API key'
          defaultValue={props.apiKey ? props.apiKey : fieldText}
          onChange={event => setFieldText(event.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onRunInDeveloperMode}>
          Run in developer mode
        </Button>
        <Button onClick={handleOnClick} disabled={fieldText.length === 0}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ApiKeyDialog.propTypes = {
  apiKey: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmitApiKey: PropTypes.func,
  onRunInDeveloperMode: PropTypes.func
}
