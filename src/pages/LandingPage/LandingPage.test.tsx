import { screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { renderWithStore } from '../../utils/testUtils';


describe('LandingPage', () => {
    test('renders correctly', () => {
        renderWithStore(<LandingPage />)
        expect(screen.getByRole('heading', { name: "Order(s)" })).toBeInTheDocument();
    })

});