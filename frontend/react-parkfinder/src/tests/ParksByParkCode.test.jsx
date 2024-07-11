import { render, screen } from '@testing-library/react' 
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ParksByParkCode from '../components/ParksByParkCode';
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('ParksByParkCode', () => {
  it('renders the ParksByParkCode component', () => {
    render(
    <MemoryRouter>
        <ParksByParkCode  />
    </MemoryRouter>
    )
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})