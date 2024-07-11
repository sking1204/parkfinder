import { render, screen } from '@testing-library/react'
import App from '../App'
import ReviewsList from '../components/ReviewsList'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('ReviewsList', () => {
  it('renders the ReviewsList component', () => {
    render(<ReviewsList />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})