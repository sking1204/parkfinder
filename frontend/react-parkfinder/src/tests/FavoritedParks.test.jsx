import { render, screen } from '@testing-library/react' 
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import FavoritedParks from '../components/FavoritedParks';
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('FavoritedParks', () => {
  it('renders the FavoritedParks component', () => {
    render(
    <MemoryRouter>
        <FavoritedParks  />
    </MemoryRouter>
    )
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})