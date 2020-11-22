import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogTitle, DialogActions, makeStyles, useMediaQuery } from '@material-ui/core'
import CustomColors from '../../resources/color-constants'
import ResultMap from './resultMap'

const useStyles = makeStyles({
  containedMap: {
    height: '400px',
    width: '500px',
    margin: '10px'
  },
  fullScreenMap: {
    height: '100%',
    width: 'auto',
    margin: '5px'
  },
  dialogContent: {
    backgroundColor: CustomColors.DARK
  },
  dialogTitle: {
    width: 'fit-content',
    background: CustomColors.GRADIENT,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  },
  newRoundButton: {
    color: CustomColors.ACCENT1,
    backgroundColor: CustomColors.DARK,
    transition: '0.3s',
    '&:hover': {
      color: CustomColors.DARK,
      backgroundColor: CustomColors.ACCENT1
    }
  },
  fullScreenNewRound: {
    width: '100%'
  }
})

export default function ResultDialog ({ distance, initialLocation, selectedLocation, restart, open }) {
  const classes = useStyles()
  const isSmallScreen = useMediaQuery('(max-width: 600px)')

  const distanceString = distance >= 1000 ? distance / 1000 + ' km' : distance + ' m'

  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullScreen={isSmallScreen}
      PaperProps={{ className: classes.dialogContent }}
    >
      <DialogTitle
        className={classes.dialogTitle}
        id='alert-dialog-title'
      >
        {'You are ' + distanceString + ' off!'}
      </DialogTitle>
      <div className={isSmallScreen ? classes.fullScreenMap : classes.containedMap}>
        <ResultMap initialLocation={initialLocation} selectedLocation={selectedLocation} />
      </div>
      <DialogActions>
        <Button
          className={isSmallScreen ? classes.fullScreenNewRound : classes.newRoundButton}
          onClick={restart}
          color='primary'
        >
          New Round
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ResultDialog.propTypes = {
  distance: PropTypes.number,
  initialLocation: PropTypes.object,
  selectedLocation: PropTypes.object,
  restart: PropTypes.func,
  open: PropTypes.bool
}
