import { render, screen } from '@testing-library/react' 
import SavedItems from '../components/SavedItems'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('SavedItems', () => {
  it('renders the SavedItems component', () => {
    render(<SavedItems  />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})