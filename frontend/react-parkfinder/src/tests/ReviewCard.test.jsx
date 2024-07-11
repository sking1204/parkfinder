import { render, screen } from '@testing-library/react'
import App from '../App'
import ReviewCard from '../components/ReviewCard'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('ReviewCard', () => {
  it('renders the ReviewCard component', () => {
    render(<ReviewCard />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})