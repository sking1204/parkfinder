import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import Pagination from "./Pagination";
import {userEvent} from "@testing-library/user-event"
    


// describe('Pagination', () =>{
//     it('renders correct pagination', () =>{
//         render(<Pagination total={50} limit={10} currentPage={1} />);
//         //this test should fail because we are getting 5 pages and not one
//         // expect(screen.getAllByTestId('page-container').length).toEqual(1)
//         //this test passes
//         // expect(screen.getAllByTestId('page-container').length).toEqual(5)
//         //this is the same as above and will pass
//         expect(screen.getAllByTestId('page-container')).toHaveLength(5);
//         expect(screen.getAllByTestId('page-container')[0]).toHaveTextContent("1");

//         // screen.debug();
//     })
// })

//same code but cleaner:

describe('Pagination', () =>{
    it('renders correct pagination', () =>{
        render(<Pagination total={50} limit={10} currentPage={1} />);
        const pageContainers = screen.getAllByTestId("page-container");   
        expect(pageContainers).toHaveLength(5);
        expect(pageContainers[0]).toHaveTextContent("1"); 
    })

    it('should emit clicked page', async() =>{
        const user = userEvent.setup()
        const handleClick = vi.fn();
        render(
          <Pagination 
            total={50} 
            limit={10} 
            currentPage={1}
            selectPage={handleClick}
          />
        );
        const pageContainers = screen.getAllByTestId("page-container"); 
        await user.click(pageContainers[0])
        expect(handleClick).toHaveBeenCalledOnce();
        //this test will fail
        expect(handleClick).toHaveBeenCalledWith(1);

    })
})
