import { render, screen } from "@testing-library/react";
import Header from "../components/header/Header";
import {BrowserRouter as Router} from 'react-router-dom';

// Login button class  
test("Login button style", () => {
    render (
    <Router>
        <Header />
    </Router>);
    const button = screen.getByTestId('login-button');
    expect(button).toHaveClass('btn btn-outline-primary');
});


// Register button class
test("Register button style", () => {
    render (
    <Router>
        <Header />
    </Router>);
    const button = screen.getByTestId('register-button');
    expect(button).toHaveClass('btn btn-outline-primary');
});

// Login to be visible
test("Login button visible", () => {
    render (
    <Router>
        <Header />
    </Router>);
    const loginButton = screen.getByTestId('login-button');
    expect(loginButton).toBeVisible();
});

// Register to be visible
test("Register button visible", () => {
    render (
    <Router>
        <Header />
    </Router>);
    const registerButton = screen.getByTestId('register-button');
    expect(registerButton).toBeVisible();
});

// Slogan exists
test("Slogan exists", () => {
    render (
    <Router>
        <Header />
    </Router>);
    const slogan = screen.getByTestId('slogan');
    expect(slogan).toBeInTheDocument();
});

// Slogan to be visible
test("Slogan visible", () => {
    render (
    <Router>
        <Header />
    </Router>);
    const slogan = screen.getByTestId('slogan');
    expect(slogan).toBeVisible();
});

