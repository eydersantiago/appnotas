import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { firebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe('Pruebas en JournalThunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote debe de crear una nueva nota en blanco', async () => {

        const uid = 'TEST_UID';
        getState.mockReturnValue({
            auth: { uid: uid }
        });

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());

        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imgsUrls: expect.any(Array)
        }));

        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            title: '',
            body: '',
            id: expect.any(String),
            date: expect.any(Number),
            imgsUrls: expect.any(Array)
        }));

        //Borrar de firebase
        const collectionRef = collection(firebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];

        //We fill the array with the promises of deleting docs
        docs.forEach(doc => {
            deletePromises.push(deleteDoc(doc.ref));
        });

        //The docs are deleted together
        await Promise.all(deletePromises);

    });
});