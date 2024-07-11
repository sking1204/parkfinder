import { render, screen } from '@testing-library/react' 
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SelectParkResultsCard from '../components/SelectParkResultsCard';
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('SelectParkResultsCard', () => {
  it('renders the SelectParkResultsCard component', () => {
    const mockPark = {
      fullName: 'Mock Park',
      description: 'Mock Park is located in Nevada.',
      parkCode: "MOCK",
      images: [{ url: 'https://www.mockpark.com/image.jpg' }]
    };
    render(
    <MemoryRouter>
        <SelectParkResultsCard park={mockPark}  />
    </MemoryRouter>
    )

    expect(screen.getByText('Mock Park is located in Nevada.')).toBeInTheDocument();
    expect(screen.getByText('Mock Park')).toBeInTheDocument();    
    expect(screen.getByText('Park Code: MOCK')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://www.mockpark.com/image.jpg');
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})