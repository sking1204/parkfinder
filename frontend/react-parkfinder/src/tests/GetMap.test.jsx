import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GetMap from '../components/GetMap';
import { expect, it, describe } from 'vitest';

describe('ParksByName', () => {
  it('renders the GetMap component', () => {
    const mockPark = {
      fullName: 'Mock Park',
      latLong: 'lat:34.0522, long:-118.2437',
    };

    render(
      <MemoryRouter>
        <GetMap park={mockPark} />
      </MemoryRouter>
    );

    expect(screen.getByText('Map - Mock Park')).toBeInTheDocument();
  });
});