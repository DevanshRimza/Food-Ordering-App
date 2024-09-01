import {fireEvent, render,screen} from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore"
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it ("Should render Header Component with login button",() => {
    render(
  <BrowserRouter>
    <Provider store={appStore}>
    <Header />
    </Provider>
  </BrowserRouter>
);

//const loginButton = screen.getByRole("button");
const loginButton = screen.getByRole("button", {name : "Login"});

//const loginButton = screen.getByText("login");


expect(loginButton).toBeInTheDocument();


})

it ("Should render Header Component with Cart item 0",() => {
    render(
  <BrowserRouter>
    <Provider store={appStore}>
    <Header />
    </Provider>
  </BrowserRouter>
);

const cartItems = screen.getByText("Cart (0 items)");

expect(cartItems).toBeInTheDocument();


})

it ("Should render Header Component with Cart items",() => {
    render(
  <BrowserRouter>
    <Provider store={appStore}>
    <Header />
    </Provider>
  </BrowserRouter>
);

const cartItems = screen.getByText(/Cart/);

expect(cartItems).toBeInTheDocument();


})

it ("Should change login button to logout on click",() => {
    render(
  <BrowserRouter>
    <Provider store={appStore}>
    <Header />
    </Provider>
  </BrowserRouter>
);

const loginButton = screen.getByRole("button", {name : "Login"});

fireEvent.click(loginButton);

const logoutButton = screen.getByRole("button", {name : "Logout"});

expect(logoutButton).toBeInTheDocument();


})