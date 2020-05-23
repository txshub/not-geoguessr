import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography, Toolbar, Button, SwipeableDrawer, makeStyles } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

const useStyles = makeStyles({
  drawer: {
    display: 'flex'
  },
  typography: {
    flexGrow: 1
  },
  drawerButton: {
    position: 'absolute',
    width: 'fit-content',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0px',
    zIndex: 1300,
    opacity: '70%',
    transition: '0.2s',
    '@media (pointer: coarse), (hover: none)': {
      zIndex: 2
    },
    '&:hover': {
      opacity: '100%'
    }
  }
})

export default function NavDrawer (props) {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open)
  }

  const handlePanToInitialLocation = event => {
    setDrawerOpen(false)
    props.panToInitialLocation()
  }

  return (
    <div>
      <Button
        className={classes.drawerButton}
        onClick={toggleDrawer(true)}
        color='inherit'
        variant='contained'
      >
        <ExpandMore />
      </Button>
      <SwipeableDrawer
        className={classes.drawer}
        anchor='top'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={50}
      >
        <Toolbar>
          <Typography className={classes.typography} variant='h4'>Not Geoguessr</Typography>
          <Button onClick={handlePanToInitialLocation}>Go back to initial location</Button>
        </Toolbar>
      </SwipeableDrawer>
    </div>
  )
}

NavDrawer.propTypes = {
  panToInitialLocation: PropTypes.func
}