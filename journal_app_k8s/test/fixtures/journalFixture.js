export const notes = [
    {
        id: 'QnAVWgK4Rk4aIHT6FMqX',
        title: 'Viernes',
        imgsUrls: [
            'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790356/journal/qjzxuernzxicuwsq7ypt.png',
            'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790354/journal/ooh0t66syg3dws4jose8.png',
            'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790355/journal/wm6obq31ip8pwhhwt0n3.png',
            'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790354/journal/icnt6mblvwm4oqumbj5m.png'
        ],
        date: 1665790316706,
        body: 'Me la pase muy bien en mi oficina propia :) '
    },
    {
        id: 'sdfasdfewqEWRQWerqWER',
        title: 'Jueves',
        imgsUrls: [
            'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790356/journal/qjzxuernzxicuwsq7ypt.png',
            'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790354/journal/ooh0t66syg3dws4jose8.png',
        ],
        date: 1665790316706,
        body: 'Me la pase muy bien en mi oficina propia x2 :) '
    },
    {
        id: 'ABC123',
        title: '',
        body: '',
        date: 12345,
        imgsUrls: []
    }
];

export const updateNote = {
    id: 'QnAVWgK4Rk4aIHT6FMqX',
    title: 'Viernes de monitoriaaaaa',
    imgsUrls: [
        'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790356/journal/qjzxuernzxicuwsq7ypt.png',
        'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790354/journal/ooh0t66syg3dws4jose8.png',
        'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790355/journal/wm6obq31ip8pwhhwt0n3.png',
        'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790354/journal/icnt6mblvwm4oqumbj5m.png'
    ],
    date: 1665790316706,
    body: 'Me la pase muy bien en mi oficina propia :) pero tenia cansancio'
};
export const initialState = {
    isSaving: false,
    savedMessage: '',
    notes: [],
    active: null,
};

export const stateActiveNote =
{
    isSaving: false,
    savedMessage: '',
    notes: notes,
    active: {
        id: 'ABC123',
        title: '',
        body: '',
        date: 12345,
        imgsUrls: []
    }
};

export const notesLogout = {

}

export const imgsUrls = [
    'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790356/journal/qjzxuernzxicuwsq7ypt.png',
    'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790354/journal/ooh0t66syg3dws4jose8.png',
    'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790355/journal/wm6obq31ip8pwhhwt0n3.png',
    'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790354/journal/icnt6mblvwm4oqumbj5m.png'
];

export const newNote = {
    title: '',
    body: '',
    date: '123456',
    imgsUrls: []
}
