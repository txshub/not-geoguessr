import React, { useState } from 'react'
import { LoadScript } from '@react-google-maps/api'
import StreetView from '../src/components/StreetView/streetView'
import SelectionMap from '../src/components/SelectionMap/selectionMap'
import ApiKeyDialogOpen from '../src/components/ApiKeyDialog/apiKeyDialog'
import { Typography, Toolbar, Button, Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const SET_TEXT = 'Set Api Key'
const CHANGE_TEXT = 'Change Api Key'

const useStyles = makeStyles({
  drawer: {
    display: 'flex'
  },
  typography: {
    flexGrow: 1
  }
})

export default function App () {
  const classes = useStyles()

  const [apiKey, setApiKey] = useState(null)
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open)
  }

  const game = () => {
    return (
      <LoadScript id='script-loader' googleMapsApiKey={apiKey}>
        <StreetView />
        <SelectionMap />
      </LoadScript>
    )
  }

  return (
    <div className='App'>
      <Button onClick={toggleDrawer(true)} color='inherit'>Drawer</Button>
      <Drawer className={classes.drawer} anchor='top' open={drawerOpen} onClose={toggleDrawer(false)}>
        <Toolbar>
          <Typography className={classes.typography} variant='h4'>Not Geoguessr</Typography>
          <Button onClick={openApiKeyDialog} color='inherit'>{apiButtonText}</Button>
        </Toolbar>
      </Drawer>
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
