import React from 'react'
import LoadingBackdrop from '../loadingBackdrop'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/'

test('renders a spinner', () => {
  const component = render(<LoadingBackdrop open />)
  expect(component.baseElement.querySelector('svg')).not.toBeNull()
})
