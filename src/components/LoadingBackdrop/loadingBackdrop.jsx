import React from 'react'
import PropTypes from 'prop-types'
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 3000,
    color: '#fff'
  }
}))

export default function LoadingBackdrop ({ open }) {
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

LoadingBackdrop.propTypes = {
  open: PropTypes.bool
}
