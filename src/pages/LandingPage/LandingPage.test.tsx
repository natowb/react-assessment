import { screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { renderWithStore } from '../../utils/testUtils';
import { MemoryRouter } from 'react-router-dom';


describe('LandingPage', () => {
    test('renders correctly', () => {
        renderWithStore(<LandingPage />)
        expect(screen.getByRole('heading', { name: "Order(s)" })).toBeInTheDocument();
        expect(screen.getByText("No orders have been placed so far")).toBeInTheDocument();
    })


    test('Renders order list when state has orders', async () => {
        renderWithStore(
            <MemoryRouter initialEntries={["/"]} >
                <LandingPage />
            </MemoryRouter>
            , {
                preloadedState: {
                    order: {
                        orders: [
                            {
                                id: "order1",
                                firstName: "John",
                                lastName: "Doe",
                                description: "Bulk order",
                                quantity: 5,
                            },
                            {
                                id: "order2",
                                lastName: "LastNameOnly",
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
        expect(screen.getByText(/LastNameOnly/i)).toBeInTheDocument();

    });
});