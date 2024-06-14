import {render, screen} from '@testing-library/react';
import OrderPage from './OrderPage';


describe('OrderPage', () => {
    test('renders correctly', () => {
        render(<OrderPage/>)
        expect(screen.getByRole('heading', {name: "Place an Order"})).toBeInTheDocument();
    })
});