import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import userEvent from "@testing-library/user-event";

describe('AppLayout', () => {
    test('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <AppLayout />
            </MemoryRouter>
        );

        // when the App initially runs we expect to see the LandingPage and note the OrderPage when at '/'
        expect(screen.getByRole('heading', { name: "Order(s)" })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: "Place an Order" })).toBeNull();


    })


    test('Navbar correctly routes to different page', async () => {

        const user = userEvent.setup();
        render(
            <MemoryRouter initialEntries={["/"]}>
                <AppLayout />
            </MemoryRouter>
        );


        const dropDownButton = screen.getByText('Menu');
        // Click the dropdown button
        await user.click(dropDownButton);
        // Click the 'New Item' button in navbar
        await user.click(screen.getByText('New Item'))



        // when the Navbar 'New Item' button is clicked we expect OrderPage to be shown and LandingPage to be gone
        expect(screen.queryByRole('heading', { name: "Order(s)" })).toBeNull();
        expect(screen.getByRole('heading', { name: "Place an Order" })).toBeInTheDocument();
    })

});