import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import ParksByState from "../components/ParksByState";

describe('ParksByState', () =>{
    it('renders ParksByState component', () =>{
        render(<ParksByState/>)
    })
})