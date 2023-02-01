import { render, screen } from "@testing-library/react";
import Login from "../components/login/Login";
import {BrowserRouter as Router} from 'react-router-dom';

// Required input (email)
test("Email input required", () => {
render (
    <Router>
        <Login />
    </Router>);
    const emailInput = screen.getByTestId("email-input");
    expect(emailInput).toBeRequired();
});

// Required input (password)
test("Password input required", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const passwordInput = screen.getByTestId("pass-input");
    expect(passwordInput).toBeRequired();
});


// Button type submit 
test("Button type submit", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const button = screen.getByTestId('login-button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).not.toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('type', expect.stringContaining('sub'));
    expect(button).toHaveAttribute('type', expect.not.stringContaining('but'));
});

// Email input type email
test("Email input type email", () => {
    render (
    <Router>
        <Login />
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
        <Login />
    </Router>);
    const passwordInputType = screen.getByTestId('pass-input');
    expect(passwordInputType).toHaveAttribute('type', 'password');
    expect(passwordInputType).not.toHaveAttribute('type', 'text');
    expect(passwordInputType).toHaveAttribute('type', expect.stringContaining('password'));
    expect(passwordInputType).toHaveAttribute('type', expect.not.stringContaining('text'));
});

// Button text "Ingresar"
test("Button text", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const button = screen.getByTestId('login-button');
    expect(button).toHaveTextContent('Ingresar');
    expect(button).toHaveTextContent(/Ingresar$/i);
    expect(button).not.toHaveTextContent('ingresar');
});

// Button class
test("Button style", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const button = screen.getByTestId('login-button');
    expect(button).toHaveClass('btn btn-primary');
    expect(button).not.toHaveClass('btn btn-secondary');
});

// Button to be visible
test("Button visible", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const button = screen.getByTestId('login-button');
    expect(button).toBeVisible();
    expect(button).not.toBeDisabled();
    
});


// Button exists
test("Button exists", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const button = screen.getByTestId('login-button');
    expect(button).toBeInTheDocument();
});


// Link to register to be visible
test("Link to register visible", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const linkRegister = screen.getByTestId('link-register');
    expect(linkRegister).toBeVisible();
    expect(linkRegister).not.toBeDisabled();
});


// Link to register exists
test("Link to register exists", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const linkRegister = screen.getByTestId('link-register');
    expect(linkRegister).toBeInTheDocument();
});

// Toggle password
test("Toggle password", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const togglePass = screen.getByTestId('toggle-pass');
    expect(togglePass).toBeInTheDocument();
});

// Title section "Iniciar Sesion"
test("Title section", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const button = screen.getByTestId('title-section');
    expect(button).toHaveTextContent('Iniciar Sesion');
    expect(button).toHaveTextContent(/Iniciar Sesion$/i);
    expect(button).not.toHaveTextContent('iniciar sesion');
});

// Div container login class
test("Div container login", () => {
    render (
    <Router>
        <Login />
    </Router>);
    const divLogin = screen.getByTestId('div-login');
    expect(divLogin).toHaveClass('login');
    expect(divLogin).not.toHaveClass('div');
});


