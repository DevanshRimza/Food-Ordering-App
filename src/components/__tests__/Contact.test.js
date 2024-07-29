import {render,screen} from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact us Page Test Case",()=> {

test("Should load contact us component",() => {

    render(<Contact />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
})

test("Should load input name in contact us component",() => {

    render(<Contact />);

    const inputName = screen.getByPlaceholderText("name");

    expect(inputName).toBeInTheDocument();
})

test("Should load 2 input boxes in contact us component",() => {

    render(<Contact />);

    const inputBoxes = screen.getAllByRole("textbox");

    expect(inputBoxes.length).toBe(2);
})
})
