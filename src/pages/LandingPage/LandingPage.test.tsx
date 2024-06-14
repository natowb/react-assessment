import {render, screen} from '@testing-library/react';
import LandingPage from './LandingPage';


describe('LandingPage', () => {
    test('renders correctly', () => {
        render(<LandingPage/>) 
        expect(screen.getByRole('heading', {name: "Order(s)"})).toBeInTheDocument();
    })
});