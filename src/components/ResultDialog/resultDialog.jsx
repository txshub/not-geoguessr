import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core'

export default class ResultDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      distance: 0
    }
  }

  showResult (distance) {
    this.setState({
      open: true,
      distance: distance
    })
  }

  getDistanceString (distance) {
    return distance >= 1000 ? distance / 1000 + ' km' : distance + ' m'
  }

  onRestart (event) {
    this.setState({
      open: false,
      distance: 0
    })
    this.props.restart()
  }

  render () {
    return (
      <Dialog
        open={this.state.open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'You are ' + this.getDistanceString(this.state.distance) + ' off!'}</DialogTitle>
        <DialogActions>
          <Button onClick={() => this.onRestart()} color='primary'>
            New Round
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
