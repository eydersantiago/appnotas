export const initialState = {
    status: 'checking', //checking, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const authenticatedState = {
    status: 'authenticated', //checking, not-authenticated, authenticated
    uid: 'ABC123',
    email: 'santi@gmail.com',
    displayName: 'Santiago',
    photoURL: 'https://santi.jpg',
    errorMessage: null,
};

export const notAuthenticatedState = {
    status: 'not-authenticated', //checking, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const demoUser = {
    uid: 'ABC123',
    email: 'santi@gmail.com',
    displayName: 'Santiago',
    photoURL: 'https://santi.jpg',
};