import {afterEach, vi} from "vitest";
import {cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() =>{
  cleanup();
  vi.clearAllMocks();
});




// import { afterEach } from 'vitest'
// import { cleanup } from '@testing-library/react'
// // import '@testing-library/jest-dom/vitest'
// import '@testing-library/jest-dom'

// // runs a clean after each test case (e.g. clearing jsdom)
// afterEach(() => {
//   cleanup();
// })