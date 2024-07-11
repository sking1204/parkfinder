import { render, screen } from '@testing-library/react';
import SignUpForm from '../auth/SignUpForm';
import { MemoryRouter } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

describe('Signup Form', () => {
  it('renders the SignupForm component', () => {
    const mockUser = {
      username: 'testuser',
      email: 'test@example.com',
    };

    const wrapper = ({ children }) => (
      <UserContext.Provider value={mockUser}>
        <MemoryRouter>
          <SignUpForm />
        </MemoryRouter>
      </UserContext.Provider>
    );

    render(<SignUpForm />, { wrapper });

    screen.debug();
  });
});

// import { render, screen } from '@testing-library/react'
// import App from '../App'
// import SignUpForm from '../auth/SignUpForm'
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import { useNavigate, MemoryRouter } from 'react-router-dom';
// import TokenContext from "../contexts/TokenContext";
// import UserContext from "../contexts/UserContext";

// // import { describe, it, expect } from 'vitest'
// import matchers from '@testing-library/jest-dom'
// import { expect, it } from 'vitest'
// // expect.extend(matchers)

// describe('Signup Form', () => {
//   it('renders the SignupForm component', () => {
//     render(
//         <MemoryRouter>
//     <SignUpForm />
//     </MemoryRouter>
// )
    
//     screen.debug(); // prints out the jsx in the App component unto the command line
//   })
// })