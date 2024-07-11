import { render, screen } from '@testing-library/react'
import App from '../App'
import Homepage from '../components/Homepage'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('Homepage', () => {
  it('renders the Homepage component', () => {
    render(<Homepage />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

  it('displays the image with alt text "Park image"', () => {
    render(<Homepage />);
    const image = screen.getByAltText('Park image');
    expect(image).toBeVisible();
  });

  it("should have welcome to parkfinder", () =>{
  render (<Homepage />);
  const message = screen.queryByText(/Welcome to Parkfinder!/i);
  expect(message).toBeVisible();
})

it('displays the image with correct src path', () => {
    render(<Homepage />);
    const image = screen.getByAltText('Park image');
    expect(image).toHaveAttribute('src', '../src/assets/background3.jpg');
  });



  

  

})