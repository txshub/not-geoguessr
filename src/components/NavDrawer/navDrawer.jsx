import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography, Toolbar, Button, SwipeableDrawer, makeStyles } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  drawer: {
    display: 'flex'
  },
  toolbar: {
    backgroundColor: theme.background
  },
  expandMore: {
    color: theme.background
  },
  typographyContainer: {
    flexGrow: 1
  },
  typography: {
    width: 'fit-content',
    background: theme.gradient,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  },
  drawerButton: {
    background: theme.gradient,
    position: 'absolute',
    width: 'fit-content',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0px',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    zIndex: 1300,
    opacity: '70%',
    transition: '0.2s',
    '@media (pointer: coarse), (hover: none)': {
      zIndex: 2
    },
    '&:hover': {
      opacity: '100%'
    }
  },
  initialLocationButon: {
    color: theme.primary,
    backgroundColor: theme.background,
    transition: '0.3s',
    '&:hover': {
      color: theme.background,
      backgroundColor: theme.primary
    }
  }
}))

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
        variant='contained'
      >
        <ExpandMore className={classes.expandMore} />
      </Button>
      <SwipeableDrawer
        className={classes.drawer}
        anchor='top'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={50}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.typographyContainer}>
            <Typography className={classes.typography} variant='h4'>Not Geoguessr</Typography>
          </div>
          <Button className={classes.initialLocationButon} onClick={handlePanToInitialLocation}>Go back to initial location</Button>
        </Toolbar>
      </SwipeableDrawer>
    </div>
  )
}

NavDrawer.propTypes = {
  panToInitialLocation: PropTypes.func
}
