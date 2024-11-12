import { useEffect, useMemo, useRef } from "react"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import moment from "moment/moment"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { useForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSavingNotes, startUploadingFiles } from "../../store/journal/thunks"
import { ImageGallery } from "../components"
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, savedMessage, isSaving } = useSelector(state => state.journal)
    const { title, body, date, onInputChange, formState } = useForm(note);

    const fileInputRef = useRef();

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (savedMessage.length > 0) {
            Swal.fire('Nota actualizada!', savedMessage, 'success')
        }
    }, [savedMessage])

    const onSaveNote = () => {
        dispatch(startSavingNotes());
    }

    const onFileInputChange = ({ target }) => {
        if (target.files.length === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            direction='row'
            justifyContent='space-between'
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography sx={{ fontSize: 39, fontWeight: "light" }}>{moment(dateString).format('LLLL')}</Typography>
            </Grid>

            <Grid item>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />

                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    color='primary'
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label='Título'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />

                <Grid
                    container
                    justifyContent='end'
                >
                    <Button
                        onClick={onDelete}
                        sx={{ mt: 2 }}
                        color='error'
                    >
                        <DeleteOutline />
                        Borrar
                    </Button>
                </Grid>

                <ImageGallery imgsUrls={note.imgsUrls} />


            </Grid>

        </Grid>
    )
}
