export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123123',
    email: 'test@mail.com',
    displayName: 'User test',
    photoURL: 'https://test.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const userTest = {
    uid: 'ABC123',
    email: 'test@mail.com',
    displayName: 'User test',
    photoURL: 'https://test.jpg',
}