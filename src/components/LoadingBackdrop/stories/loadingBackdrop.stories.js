import React from 'react'
import LoadingBackdrop from '../loadingBackdrop'

export default {
  title: 'LoadingBackdrop',
  component: LoadingBackdrop
}

export const Default = (props) => <LoadingBackdrop {...props} />
Default.args = {
  open: true
}
Default.parameters = { docs: { page: null } }
