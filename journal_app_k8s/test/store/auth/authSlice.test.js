import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixture";

describe('Pruebas en el authSlice', () => {
    test('debe de regresar el initialState y llamarse el "auth"', () => {

        expect(authSlice.name).toBe('auth');

        const state = authSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('debe de realizar la autenticacion', () => {

        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual(authenticatedState);

    });

    test('debe de realizar el logout sin argumentos', () => {

        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated', //checking, not-authenticated, authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        });

    });

    test('debe de realizar el logout y mostrar un mensaje de error', () => {

        const errorMessage = 'Logouted successfully';
        const state = authSlice.reducer(authenticatedState, logout(errorMessage));

        expect(state).toEqual({
            status: 'not-authenticated', //checking, not-authenticated, authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        });

    });

    test('debe de cambiar el estado a checking', () => {

        const state = authSlice.reducer(authenticatedState, checkingCredentials());

        expect(state.status).toBe('checking');

    });

});