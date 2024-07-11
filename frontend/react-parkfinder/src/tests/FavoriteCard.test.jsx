import { render, screen } from '@testing-library/react' 
import FavoriteCard from '../components/FavoriteCard'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('FavoriteCard', () => {
  it('renders the FavoriteCard component', () => {
    render(<FavoriteCard  />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})