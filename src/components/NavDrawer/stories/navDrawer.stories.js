import React from 'react'
import NavDrawer from '../navDrawer'

export default {
  title: 'NavDrawer',
  component: NavDrawer,
  argTypes: {
    panToInitialLocation: {
      action: 'panToInitialLocation'
    }
  }
}

export const Default = (props) => <NavDrawer {...props} />
