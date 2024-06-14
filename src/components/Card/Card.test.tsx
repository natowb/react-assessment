import { render, screen } from "@testing-library/react"
import Card from "./Card"

describe('Card', () => {
    test('renders properly', ()=> {
        render(<Card children={<h1>Hello World</h1>} ></Card>)
        expect(screen.getByRole('heading', {name: "Hello World"})).toBeInTheDocument();
    })
})