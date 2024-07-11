import { render, screen } from '@testing-library/react' 
import ActivitiesList from '../components/ActivitiesList'
// import { describe, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom'
import { expect, it } from 'vitest'
// expect.extend(matchers)

describe('ActivitiesList', () => {
  it('renders the ActivitiesList component', () => {
    render(<ActivitiesList  />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

})