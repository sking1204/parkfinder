import { render, screen } from '@testing-library/react' 
import PageNotFound from '../components/PageNotFound' 

import { expect, it} from 'vitest'
import { MemoryRouter } from 'react-router-dom' 


describe('PageNotFound', () => {
  it('renders the FindParks component', () =>{
    render(
      <MemoryRouter>
        <PageNotFound /> 
      </MemoryRouter>
    )
  }) 
  
  it('displays the correct heading text', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
    const heading = screen.getByText(/404 - Page Not Found/i);
    expect(heading).toBeInTheDocument();
  });

  it('displays the correct paragraph text', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
    const paragraph = screen.getByText('Sorry, the page you are looking for could not be found.');
    expect(paragraph).toBeInTheDocument();
  });
    
    // screen.debug(); // prints out the jsx in the App component unto the command line
  })
  
