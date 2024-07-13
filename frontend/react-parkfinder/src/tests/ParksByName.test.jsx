import { render, screen } from '@testing-library/react' 
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ParksByName from '../components/ParksByName'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it, vi, mockResolvedValue } from 'vitest'
import ParkfinderApi from '../services/ParkfinderApi';
// expect.extend(matchers)

// Mock the API module
vi.mock('../ParkfinderApi');

describe('ParksByName', () => {
  it('renders the ParksByName component', async () => {
    // Mock the API response
    ParkfinderApi.getAllParks = vi.fn().mockResolvedValue({
      parks: {
        parkNames: ['Mock Park'],
        parkCodes: ['abc123']
      }
    });
    
    render(
    <MemoryRouter>
        <ParksByName/>
    </MemoryRouter>
    )
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})