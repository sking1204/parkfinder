import { render, screen } from '@testing-library/react'
import App from '../App'
import ParkfinderRoutes from '../components/ParkfinderRoutes'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect } from 'vitest'
// expect.extend(matchers)

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

  it('renders the ParkfinderRoutes component', () => {
    render(<ParkfinderRoutes />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

  

})

// it("should have hello world", () =>{
//   render (<App />);
//   const message = screen.queryByText(/Hello World/i);
//   expect(message).toBeVisible();
// })