import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIt } from "../../../src/store/auth/thunks";
import { notAuthenticatedState } from "../../fixtures/authFixture";

const mockStartGoogleSignIt = jest.fn();
const mockStartLoginWithUserWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
    startGoogleSignIt: () => mockStartGoogleSignIt,
    mockStartLoginWithUserWithEmailPassword: ({ email, password }) => () => mockStartLoginWithUserWithEmailPassword({ email, password })
}));

jest.mock("react-redux", () => ({
    UseDispatch: () => (fn) => fn(),
    ...jest.requireActual("react-redux")
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});


describe('Pruebas en <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el componente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );


        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);

    });

/* 
    test('Boton de Google debe de llamar el startGoogleSignIt', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const btnGoogle = screen.getByLabelText('btnGoogle');

        fireEvent.click(btnGoogle);

        // expect(dispatch).toHaveBeenCalledWith(startGoogleSignIt());
        expect(mockStartGoogleSignIt).toHaveBeenCalled();

    }); */
/* 
    test('Submit debe de llamar startLoginWithUserWithEmailPassword con email y password', () => {

        const email = 'santiago@gmail.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { label: 'Correo' });
        fireEvent.change(emailField, { target: { name: 'email', value: email } });

        const passwordField = screen.getByLabelText('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });

        const submitForm = screen.getByTestId('submitForm');
        fireEvent.submit(submitForm);

        expect(mockStartLoginWithUserWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        });
    }); */

});