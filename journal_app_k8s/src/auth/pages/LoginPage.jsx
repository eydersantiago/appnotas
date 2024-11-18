import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSignIt, startLoginWithUserWithEmailPassword } from '../../store/auth'
import { useMemo } from 'react'

const formData = {
  email: 'santi@gmail.com',
  password: '123456'
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const { email, password, onInputChange } = useForm(formData);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    console.log({ email, password })

    dispatch(startLoginWithUserWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn')

    dispatch(startGoogleSignIt());

  }

  return (

    <AuthLayout title='Login'>
      <form 
      onSubmit={onSubmit} 
      className='animate__animated animate__fadeIn animate__faster'
      data-testid='submitForm'
      >
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              inputProps={{
                'aria-label': 'password'
              }}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} sx={{ display: !!errorMessage ? '' : 'none' }}>
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                disabled={isAuthenticating}
              >Login</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onGoogleSignIn}
                variant='contained'
                fullWidth
                aria-label='btnGoogle'
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            direction='row'
            justifyContent='end'
          >
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>


  )
}
