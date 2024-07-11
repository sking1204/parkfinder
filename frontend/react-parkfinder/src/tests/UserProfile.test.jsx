import { render, screen } from '@testing-library/react'; 
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import UserProfile from '../components/UserProfile';

// Mock data
const mockUser = {
  username: 'testuser',
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com'
};

const mockToken = "mock-token"; // Directly provide the token string

const mockSetUser = vi.fn();

describe('UserProfile', () => {
  it('renders the Box component', async () => {
    render(
      <MemoryRouter>
        <UserProfile user={mockUser} setUser={mockSetUser} token={mockToken} />
      </MemoryRouter>
    );
    // screen.debug(); // prints out the jsx in the App component unto the command line

    // Await promise from findByTestId
    const boxElement = await screen.findByTestId('form-component');
    
    // Check if element is in document
    expect(boxElement).toBeInTheDocument();
  });
  it('renders the Text component for Username', async () => {
    render(
      <MemoryRouter>
        <UserProfile user={mockUser} setUser={mockSetUser} token={mockToken} />
      </MemoryRouter> 
    );  
    // Await promise from findByTestId
    const textFieldUsername = await screen.findByTestId('username-input');     
    // Check if element is in document
    expect(textFieldUsername).toBeInTheDocument();
  });

  it('renders the Text component for First Name', async () => {
    render(
      <MemoryRouter>
        <UserProfile user={mockUser} setUser={mockSetUser} token={mockToken} />
      </MemoryRouter> 
    );  
    // Await promise from findByTestId
    const textFieldFirstName = await screen.findByTestId('first-name-input');     
    // Check if element is in document
    expect(textFieldFirstName).toBeInTheDocument();
  });
 
});
