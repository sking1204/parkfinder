import {render, screen} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import {describe, expect, it} from "vitest";
import ParksByState from "../components/ParksByState";

describe('ParksByState', () =>{
    it('renders ParksByState component', () =>{
        render(
        <MemoryRouter>
          <ParksByState/> 
        </MemoryRouter>
        )

        
    })
})