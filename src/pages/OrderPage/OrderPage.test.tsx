import { screen } from '@testing-library/react';
import OrderPage from './OrderPage';
import { renderWithStore } from '../../utils/testUtils';
import { MemoryRouter } from 'react-router-dom';


describe('OrderPage', () => {
    test('renders correctly', () => {
        renderWithStore(
            <MemoryRouter>
                <OrderPage />
            </MemoryRouter>
        )
        expect(screen.getByRole('heading', { name: "Place an Order" })).toBeInTheDocument();
    })
});