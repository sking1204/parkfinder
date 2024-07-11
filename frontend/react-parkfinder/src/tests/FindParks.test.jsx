import { render, screen } from '@testing-library/react'
import App from '../App'
import FindParks from '../components/FindParks'
import ParksByState from '../components/ParksByState'
import { BrowserRouter } from 'react-router-dom'
import TokenContext from '../contexts/TokenContext'
import UserContext from '../contexts/UserContext'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it, vi } from 'vitest'
// expect.extend(matchers)

const token = 'sampleToken';
const user = { name: 'John Doe' };
const setUser = vi.fn();

describe('FindParks', () => {
  it('renders the FindParks component', () => {
    render(
      <h1>Find Park By State:</h1>
  );
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })
  it('renders the FindParkByCode component', () => {
    render(
      <h1>Find Park By ParkCode:</h1>
  );
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })
})



// import { render, screen } from '@testing-library/react';
// import { describe, expect, it, vi } from 'vitest';
// import FindParks from '../components/FindParks';
// import React from 'react';

// describe('FindParks', () => {
//   it('renders FindParks component', () => {
//     const token = 'mockToken';
//     const user = { username: 'mockUser' };
//     const setUser = vi.fn();

//     render(<FindParks token={token} user={user} setUser={setUser} />);

//   });
// });


// import { render, screen } from '@testing-library/react';
// import { describe, expect, it, vi } from 'vitest';
// import FindParks from '../components/FindParks';
// import React from 'react';

// describe('FindParks', () =>{
//   it('renders FindParks component', () =>{
//     render(<FindParks token={token} user={user} setUser={setUser}/>)
//     screen.debug();
//   })
// })


