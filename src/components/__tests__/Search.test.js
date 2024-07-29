import Body from "../Body";
import {fireEvent, render,screen} from "@testing-library/react";
import MOCK_DATA from "../mocks/mockResListData.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
      json : () => {
        return Promise.resolve(MOCK_DATA);
      },   
    });
});

it("Should Search res List for burger text input", async () => {

   await act(async ()=>     
    render(
            <BrowserRouter>
            <Body />
            </BrowserRouter>
           )
   );

const cardsBeforeSearch = screen.getAllByTestId("resCard");
expect(cardsBeforeSearch.length).toBe(8);

   const searchBtn = screen.getByRole("button", {name : "Search"});

   const searchInput = screen.getByTestId("searchInput");

   fireEvent.change(searchInput, { target: { value: "pizza"}});

   fireEvent.click(searchBtn);

   const cards = screen.getAllByTestId("resCard");

   expect(cards.length).toBe(2);

expect(searchBtn).toBeInTheDocument();
})

