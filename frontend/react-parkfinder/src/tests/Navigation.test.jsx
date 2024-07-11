import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route, Link, NavLink} from 'react-router-dom';
import Navigation from '../components/Navigation'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('Navigation Component', () => {
    it('renders the NavLink component', () => {
      render(
        <MemoryRouter >
        <NavLink />
      </MemoryRouter>
      )
      
      screen.debug(); // prints out the jsx in the App component unto the command line
    })

    it('renders the parks link', () => {
        render(
          <MemoryRouter initialEntries={['/parks']}>
              <NavLink path='/parks'>             
            </NavLink>
          </MemoryRouter>
        )  
        
        // Find the NavLink component containing "Parks" text
    // const parksNavLink = screen.getByText('Parks');

    // // Assert that the "Parks" text is rendered
    // expect(parksNavLink).toBeInTheDocument();
  
     
      
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })



  

  

})