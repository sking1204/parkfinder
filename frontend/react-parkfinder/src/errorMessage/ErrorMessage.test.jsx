import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import ErrorMessage from "./ErrorMessage";

describe('ErrorMessage', () =>{
    it('renders default error state', () =>{
        render(<ErrorMessage />);
        //this is just for debugging purposes, we don't need to keep this in our tests
        //to help us understand what is being rendered to the screen
        // screen.debug();

        //we expect this test to fail
        // expect(screen.getByTestId('message-container')).toHaveTextContent("foo");
        //this test passes
        expect(screen.getByTestId('message-container')).toHaveTextContent("Something went wrong");
    })

    //we expect this to fail
    // it('renders custom error state', () =>{
    //     render(<ErrorMessage message="Email is already taken" />);      
    //     expect(screen.getByTestId('message-container')).toHaveTextContent(
    //         "Something went wrong"
    //     );
    // })
    //this test passes
    it('renders custom error state', () =>{
        render(<ErrorMessage message="Email is already taken" />);      
        expect(screen.getByTestId('message-container')).toHaveTextContent(
            "Email is already taken"
        );
    })
})