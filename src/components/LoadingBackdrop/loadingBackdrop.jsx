import React, { Component } from 'react'
import { Backdrop, CircularProgress, withStyles } from '@material-ui/core'

const useStyles = {
  backdrop: {
    zIndex: 3000,
    color: '#fff'
  }
}

class LoadingBackdrop extends Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
    this.state = {
      open: false
    }
  }

  toggleBackdrop (open) {
    this.setState({
      open: open
    })
  }

  render () {
    return (
      <Backdrop className={this.classes.backdrop} open={this.state.open}>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
}

export default withStyles(useStyles)(LoadingBackdrop)
