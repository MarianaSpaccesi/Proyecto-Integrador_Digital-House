import { render, screen } from "@testing-library/react";
import Buscador from "../components/buscador/Buscador";
import {BrowserRouter as Router} from 'react-router-dom';

// City input focus
test("City input focus", () => {
render (
    <Router>
        <Buscador />
    </Router>);
    const cityInput = screen.getByTestId("city-input");
    cityInput.focus();
    expect(cityInput).toHaveFocus();
    cityInput.blur();
    expect(cityInput).not.toHaveFocus();
});

// Dates input focus
test("Dates input focus", () => {
    render (
        <Router>
            <Buscador />
        </Router>);
        const datesInput = screen.getByTestId("dates-input");
        datesInput.focus();
        expect(datesInput).toHaveFocus();
        datesInput.blur();
        expect(datesInput).not.toHaveFocus();
    });
