import { render, screen } from '@testing-library/react' 
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ParkEvents from '../components/ParkEvents';
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('ParkEvents', () => {
  it('renders the ParkEvents component', () => {
    const mockPark = {
      parkCode: 'abc123',
      fullName: 'Mock Park',
      events: [
        { id: '1', name: 'Trail Talk' },
        { id: '2', name: 'Guided Tour' },
        { id: '3', name: 'Fishing Trip' },
      ],
    };
    render(
    <MemoryRouter>
        <ParkEvents park={mockPark} user={{username: 'testUser'}} parkCode={mockPark.parkCode}  />
    </MemoryRouter>
    )
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})