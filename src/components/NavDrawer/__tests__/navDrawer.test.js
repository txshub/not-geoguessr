import React from 'react'
import NavDrawer from '../navDrawer'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/'

test('can open the drawer', async () => {
  const component = render(<NavDrawer />)

  fireEvent.click(component.baseElement.querySelector('button'))
  expect(component.getByRole('presentation')).toBeTruthy()
})

test('fires an event to pan to the initial location', () => {
  const pan = jest.fn()
  const component = render(<NavDrawer panToInitialLocation={pan} />)

  fireEvent.click(component.baseElement.querySelector('button'))
  fireEvent.click(component.getByRole('button'))
  expect(pan).toHaveBeenCalledTimes(1)
})
