import { render, screen, fireEvent, waitFor } from '@testing-library/react' 
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ParkDetail from '../components/ParkDetail';
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it, beforeEavh, vi } from 'vitest'
import ParkfinderApi from '../services/ParkfinderApi';
// expect.extend(matchers)

describe('ParksByName', () => {
  it('renders the ParkDetail component', () => {
    render(
    <MemoryRouter>
        <ParkDetail />
    </MemoryRouter>
    )
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})

