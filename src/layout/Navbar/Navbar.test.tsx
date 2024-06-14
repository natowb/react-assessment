import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";


describe('Navbar', () => {

    test('navbar displays correct on first render', () => {
        render(<Navbar />)
        // Make sure the dropdown button renders
        const dropDownButton = screen.getByText('Menu');
        expect(dropDownButton).toBeInTheDocument();
    });
    
    test('navbar displays options only after clicked', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )
    
        // Make sure when the navbar first renders both options are hidden
        expect(screen.queryByText('Home')).toBeNull();
        expect(screen.queryByText('New Item')).toBeNull();
    
    
        const dropDownButton = screen.getByText('Menu');
    
        // Click the dropdown button
        await user.click(dropDownButton);
    
    
        // Confirm after clicking the dropdown button our options are displayed
        const homeOption = screen.getByText('Home');
        expect(homeOption).toBeInTheDocument();
    
        const newItemOption = screen.getByText('New Item');
        expect(newItemOption).toBeInTheDocument();
    });
});


