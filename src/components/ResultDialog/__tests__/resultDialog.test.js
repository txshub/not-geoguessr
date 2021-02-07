import React from 'react'
import ResultDialog from '../resultDialog'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

jest.mock('../resultMap', () => { return () => <div>Mock map</div> })

test('displays the distance in meters if closer than 1km', () => {
  const component = render(<ResultDialog distance={234} open />)
  const header = component.getByRole('heading')
  expect(header).toHaveTextContent('You are 234 m off!')
})

test('displays the distance in kilometers if further than 1km', () => {
  const component = render(<ResultDialog distance={23456} open />)
  const header = component.getByRole('heading')
  expect(header).toHaveTextContent('You are 23.456 km off!')
})

test('fires the restart event when clicking the new round button', () => {
  const restart = jest.fn()
  const component = render(<ResultDialog distance={23456} open restart={restart} />)
  const newRoundButton = component.getByRole('button')
  fireEvent.click(newRoundButton)
  expect(restart).toHaveBeenCalledTimes(1)
})
