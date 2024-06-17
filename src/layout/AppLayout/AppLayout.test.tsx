import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import userEvent from "@testing-library/user-event";
import { renderWithStore } from "../../utils/testUtils";

describe('AppLayout', () => {
    test('renders correctly', () => {
        renderWithStore(
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
        renderWithStore(
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


    test('renders orders correctly', async () => {
        renderWithStore(
            <MemoryRouter initialEntries={["/"]} >
                <AppLayout />
            </MemoryRouter>
            , {
                preloadedState: {
                    order: {
                        orders: [
                            {
                                firstName: "John",
                                lastName: "Doe",
                                description: "Bulk order",
                                quantity: 5,
                            }
                        ]
                    }
                }
            })

            // If Landing Page is loaded with orders we expect this to be hidden
        expect(screen.queryByText("No orders have been placed so far")).toBeNull();

        // If Landing Page is loaded with orders we should see them
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();



    });

    test('deletes order correctly', async () => {

        const user = userEvent.setup();

        renderWithStore(
            <MemoryRouter initialEntries={["/"]} >
                <AppLayout />
            </MemoryRouter>
            , {
                preloadedState: {
                    order: {
                        orders: [
                            {
                                firstName: "John",
                                lastName: "Doe",
                                description: "Bulk order",
                                quantity: 5,
                            }
                        ]
                    }
                }
            })

            // If Landing Page is loaded with orders we expect this to be hidden
        expect(screen.queryByText("No orders have been placed so far")).toBeNull();

        // If Landing Page is loaded with orders we should see them
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();


        const deleteButton = screen.getByText("Delete");

        expect(deleteButton).toBeInTheDocument();

        await user.click(deleteButton);


        expect(screen.getByText("No orders have been placed so far")).toBeInTheDocument();
        expect(screen.queryByText(/John Doe/i)).toBeNull();
    });

});