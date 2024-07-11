import { render, screen } from '@testing-library/react'
import App from '../App'
import UserProfile from '../components/UserProfile'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('FavoriesList', () => {
  it('renders the UserProfile component', () => {
    render(<UserProfile  />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})