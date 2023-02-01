import { render, screen } from "@testing-library/react";
import Register from "../components/register/Register";
import {BrowserRouter as Router} from 'react-router-dom';

// Name input type text 
test("Name input type text", () => {
    render (
    <Router>
        <Register />
    </Router>);
    const nameInputType = screen.getByTestId('name-input');
    expect(nameInputType).toHaveAttribute('type', 'text');
    expect(nameInputType).not.toHaveAttribute('type', 'email');
    expect(nameInputType).toHaveAttribute('type', expect.stringContaining('text'));
    expect(nameInputType).toHaveAttribute('type', expect.not.stringContaining('email'));
});

// Lastname input type text
test("Name input type text", () => {
    render (
    <Router>
        <Register />
    </Router>);
    const lastnameInputType = screen.getByTestId('lastname-input');
    expect(lastnameInputType).toHaveAttribute('type', 'text');
    expect(lastnameInputType).not.toHaveAttribute('type', 'email');
    expect(lastnameInputType).toHaveAttribute('type', expect.stringContaining('text'));
    expect(lastnameInputType).toHaveAttribute('type', expect.not.stringContaining('email'));
});

// Email input type email
test("Email input type email", () => {
    render (
    <Router>
        <Register />
    </Router>);
    const emailInputType = screen.getByTestId('email-input');
    expect(emailInputType).toHaveAttribute('type', 'email');
    expect(emailInputType).not.toHaveAttribute('type', 'text');
    expect(emailInputType).toHaveAttribute('type', expect.stringContaining('email'));
    expect(emailInputType).toHaveAttribute('type', expect.not.stringContaining('text'));
});

// Password input type password
test("Password input type password", () => {
    render (
    <Router>
        <Register />
    </Router>);
    const passwordInputType = screen.getByTestId('pass-input');
    expect(passwordInputType).toHaveAttribute('type', 'password');
    expect(passwordInputType).not.toHaveAttribute('type', 'text');
    expect(passwordInputType).toHaveAttribute('type', expect.stringContaining('password'));
    expect(passwordInputType).toHaveAttribute('type', expect.not.stringContaining('text'));
});

// Password confirm input type password
test("Password confirm input type password", () => {
    render (
    <Router>
        <Register />
    </Router>);
    const passwordConfirmInputType = screen.getByTestId('pass-input-confirm');
    expect(passwordConfirmInputType).toHaveAttribute('type', 'password');
    expect(passwordConfirmInputType).not.toHaveAttribute('type', 'text');
    expect(passwordConfirmInputType).toHaveAttribute('type', expect.stringContaining('password'));
    expect(passwordConfirmInputType).toHaveAttribute('type', expect.not.stringContaining('text'));
});


// Button text "Crear cuenta"
test("Button text", () => {
    render (
    <Router>
        <Register />
    </Router>);
    const button = screen.getByTestId('register-button');
    expect(button).toHaveTextContent('Crear cuenta');
    expect(button).toHaveTextContent(/Crear cuenta$/i);
    expect(button).not.toHaveTextContent('crear cuenta');
});

// Button class
test("Button classes", () => {
    render (
    <Router>
        <Register />
    </Router>);
    const button = screen.getByTestId('register-button');
    expect(button).toHaveClass('btn btn-primary');
});


