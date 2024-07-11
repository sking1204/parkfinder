import { render, screen } from '@testing-library/react'
import App from '../App'
import FavoritesList from '../components/FavoritesList'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('FavoriesList', () => {
  it('renders the FavoritesList component', () => {
    render(<FavoritesList />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})