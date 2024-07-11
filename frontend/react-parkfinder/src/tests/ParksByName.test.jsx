import { render, screen } from '@testing-library/react' 
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ParksByName from '../components/ParksByName'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('ParksByName', () => {
  it('renders the ParksByName component', () => {
    render(
    <MemoryRouter>
        <ParksByName user={user}  />
    </MemoryRouter>
    )
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})