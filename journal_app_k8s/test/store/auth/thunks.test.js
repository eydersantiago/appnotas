import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingAuthetication, checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startGoogleSignIt, startLoginWithUserWithEmailPassword, startLogout } from "../../../src/store/auth";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixture";

jest.mock("../../../src/firebase/providers");

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingCredentials', async () => {
        await checkingAuthetication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
            payload: undefined,
            type: "auth/checkingCredentials"
        });
    });


    test('startGoogleSignIt debe llamar checkingCredentials y login exitoso', async () => {

        const loginData = {
            ok: true,
            ...demoUser
        }

        //data to login
        await signInWithGoogle.mockResolvedValue(loginData);

        //thunk
        await startGoogleSignIt()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('startGoogleSignIt debe llamar checkingCredentials y logout error', async () => {

        const errorMessage = 'Un error en Google';

        const logoutData = {
            ok: false,
            errorMessage: errorMessage
        }

        //data to logout
        await signInWithGoogle.mockResolvedValue(logoutData);

        //thunk
        await startGoogleSignIt()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(errorMessage));

    });


    test('startLoginWithUserWithEmailPassword debe de llamar checkingCredentials y login exitoso', async () => {

        const loginData = {
            ok: true,
            ...demoUser
        }

        const formData = {
            email: demoUser.email,
            password: '123456'
        }

        //data to login 
        await loginWithEmailPassword.mockResolvedValue(loginData);

        //thunk
        await startLoginWithUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('startLoginWithUserWithEmailPassword debe de llamar checkingCredentials y login error', async () => {

        const errorMessage = 'Un error en Google';

        const logoutData = {
            ok: false,
            errorMessage: errorMessage
        }

        const formData = {
            email: demoUser.email,
            password: '123456'
        }

        //data to login 
        await loginWithEmailPassword.mockResolvedValue(logoutData);

        //thunk
        await startLoginWithUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(errorMessage));

    });


    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());

    });

    test('startCreatingUserWithEmailPassword debe de crear un nuevo usuario con exito', async () => {

        const createData = {
            ok: true,
            ...demoUser
        }

        const formData = {
            displayName: demoUser.displayName,
            email: demoUser.email,
            password: '123456'
        }

        //data to register
        await registerUserWithEmailPassword.mockResolvedValue(createData);

        //thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(createData));

    });

    test('startCreatingUserWithEmailPassword debe de crear un nuevo usuario con error', async () => {
        
        const createData = {
            ok: false,
            ...demoUser
        }

        const formData = {
            displayName: demoUser.displayName,
            email: demoUser.email,
            password: '123456'
        }

        //data to register
        await registerUserWithEmailPassword.mockResolvedValue(createData);

        //thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
});