import { createContext } from 'react';

const MockUserContext = createContext({
  user: null,
  setUser: () => {},
});

export default MockUserContext;