import React, { useState } from 'react'
import './App.scss'
import StreetView from '../src/components/StreetView/streetView'
import ApiKeyDialogOpen from '../src/components/ApiKeyDialog/apiKeyDialog'
import { Typography, Container, AppBar, Toolbar, Button } from '@material-ui/core'

const SET_TEXT = 'Set Api Key'
const CHANGE_TEXT = 'Change Api Key'

export default function App () {
  const [apiKey, setApiKey] = useState(null)
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(true)
  const [developerMode, setDeveloperMode] = useState(true)
  const [apiButtonText, setApiButtonText] = useState(SET_TEXT)

  const handleClose = () => {
    if (!apiKey) {
      setDeveloperMode(true)
    }
    setApiKeyDialogOpen(false)
  }

  const handleDeveloper = () => {
    setApiKey(null)
    setDeveloperMode(true)
    setApiButtonText(SET_TEXT)
    handleClose()
  }

  const handleSubmitApiKey = (newApiKey) => {
    setApiKey(newApiKey)
    setDeveloperMode(false)
    setApiButtonText(CHANGE_TEXT)
    handleClose()
  }

  const openApiKeyDialog = () => {
    setApiKeyDialogOpen(true)
  }

  const game = () => {
    return (
      <Container className='Container' maxWidth='lg'>
        <StreetView apiKey={apiKey} />
      </Container>
    )
  }

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <Typography className='Typography' variant='h4'>Not Geoguessr</Typography>
          <Button onClick={openApiKeyDialog} color='inherit'>{apiButtonText}</Button>
        </Toolbar>
      </AppBar>
      {(developerMode || apiKey) && !apiKeyDialogOpen && game()}
      <ApiKeyDialogOpen
        apiKey={apiKey}
        open={apiKeyDialogOpen}
        onClose={handleClose}
        onRunInDeveloperMode={handleDeveloper}
        onSubmitApiKey={handleSubmitApiKey}
      />
    </div>
  )
}
