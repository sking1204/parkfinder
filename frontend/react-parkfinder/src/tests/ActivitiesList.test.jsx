import { render, screen } from '@testing-library/react';
import ActivitiesList from '../components/ActivitiesList';
import matchers from '@testing-library/jest-dom';
import { expect, it, describe } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// expect.extend(matchers);

describe('ActivitiesList', () => {
  it('renders the ActivitiesList component', () => {
    const mockPark = {
      parkCode: 'abc123',
      fullName: 'Mock Park',
      activities: [
        { id: '1', name: 'Hiking' },
        { id: '2', name: 'Camping' },
        { id: '3', name: 'Fishing' },
      ],
    };

    render(
      <MemoryRouter>
      <ActivitiesList park={mockPark} user={{ username: 'testUser' }} />
    </MemoryRouter>
    );
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});

// import { render, screen } from '@testing-library/react' 
// import ActivitiesList from '../components/ActivitiesList'
// // import { describe, it, expect } from 'vitest'
// import matchers from '@testing-library/jest-dom'
// import { expect, it } from 'vitest'
// // expect.extend(matchers)

// describe('ActivitiesList', () => {
//   it('renders the ActivitiesList component', () => {
//     render(<ActivitiesList  />)
    
//     screen.debug(); // prints out the jsx in the App component unto the command line
//   })

// })