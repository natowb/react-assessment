import { screen } from '@testing-library/react';
import OrderPage from './OrderPage';
import { renderWithStore } from '../../utils/testUtils';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


describe('OrderPage', () => {
    test('renders correctly', () => {
        renderWithStore(
            <MemoryRouter>
                <OrderPage />
            </MemoryRouter>
        )
        expect(screen.getByRole('heading', { name: "Place an Order" })).toBeInTheDocument();
    })

    test('displays form errors', async () => {

        const user = userEvent.setup();

        renderWithStore(
            <MemoryRouter>
                <OrderPage />
            </MemoryRouter>
        )


        // type 21 characters into First Name and dont provide values for the rest.
        await user.type(screen.getByPlaceholderText("John"), "123456789123456789001");

        await user.click(screen.getByRole("button", { name: "Order" }));

        // build regex for all error messages
        const errorMessagesRegex = new RegExp(
            [
                "should be no longer than 20",
                "Last Name is required",
                "Description is required",
                "Must be a number between 1 and 20"
            ].join("|"), "i"
        );

        const errorMessages = screen.getAllByText(errorMessagesRegex);
    
        expect(errorMessages).toHaveLength(4);
        expect(errorMessages[0]).toHaveTextContent('should be no longer than 20');
        expect(errorMessages[1]).toHaveTextContent('Last Name is required');
        expect(errorMessages[2]).toHaveTextContent('Description is required');
        expect(errorMessages[3]).toHaveTextContent('Must be a number between 1 and 20');


    })

});