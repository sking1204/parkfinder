import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Use MemoryRouter for testing purposes
import ParkfinderRoutes from '../components/ParkfinderRoutes';
import Navigation from '../components/Navigation';
import FindParks from '../components/FindParks';




  describe('Parkfinder Routes', () => {
    it('renders the Navigation component', () => {
      render(
        <MemoryRouter >
        <Navigation />
      </MemoryRouter>
      )
      
      screen.debug(); // prints out the jsx in the App component unto the command line
    })

    it('renders the Routes component', () => {
      render(
        <MemoryRouter >
        <Routes />
      </MemoryRouter>
      )
      
      screen.debug(); // prints out the jsx in the App component unto the command line
    }) 
    
    
    it('renders the homepage route', () => {
          render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
              <Route path="/" />
              </Routes>
            </MemoryRouter>
          )      
       
        
      
      screen.debug(); // prints out the jsx in the App component unto the command line
    })

   
        it('renders the parks route', () => {
          render(
            <MemoryRouter initialEntries={['/parks']}>
                <Routes>
              <Route path="/parks" />
              </Routes>
            </MemoryRouter>
          );    
      
      screen.debug(); // prints out the jsx in the App component unto the command line
    })

        it('renders the parks by state code route', () => {
          render(
            <MemoryRouter initialEntries={['/parks/stateCode']}>
                <Routes>
              <Route path="/parks/stateCode" />
              </Routes>
            </MemoryRouter>
          );    
      
      screen.debug(); // prints out the jsx in the App component unto the command line
    })



//   it('renders parks list route', () => {
//     const { getByText } = render(
//       <MemoryRouter initialEntries={['/parks/FL-parks']}>
//         <ParkfinderRoutes />
//       </MemoryRouter>
//     );

//     expect(getByText('Florida Parks')).toBeInTheDocument(); // Adjust based on what you render in ParksList component
//   });

  // Add more test cases for other routes as needed
});
