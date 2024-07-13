import { render, screen } from '@testing-library/react' 
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ParkFees from '../components/ParkFees';
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('ParkFees', () => {
  it('renders the ParkFees component', () => {
    const mockPark = {
      parkCode: 'abc123',
      fullName: 'Mock Park',
      entranceFees: [
        { name: 'entrance fee', cost: '$10.00' },
        { name: 'parking fee', name: '$20.00' },
        { name: 'camping fee', name: '$100.00' },
      ],
    };
    render(
    <MemoryRouter>
        <ParkFees park={mockPark} user ={{username: 'testUser'}}  />
    </MemoryRouter>
    )
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})