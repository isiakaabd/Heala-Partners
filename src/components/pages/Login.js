import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import LoginInput from 'components/validation/LoginInput'
import { Formik, Form } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Typography, Alert } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import CustomButton from 'components/Utilities/CustomButton'
import Checkbox from '@mui/material/Checkbox'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import people from 'assets/images/login-page-photo.png'
import loginBackground from 'assets/images/login-background.svg'
import logo from 'assets/images/logo.svg'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import { useActions } from 'components/hooks/useActions'
import { useSelector } from 'react-redux'
import { Login_USER } from 'components/graphQL/Mutation'
import { useMutation } from '@apollo/client'
import { setAccessToken } from '../../accessToken'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    minHeight: '100vh',
  },
  peopleImgWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(89.63deg, rgba(1, 2, 2, 0.49) 0.3%, rgba(1, 2, 2, 0) 99.66%)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  peopleBgImage: {
    width: '100%',
    height: '100%',
    background: `url(${people}) no-repeat`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    backgroundPosition: '25% 50%',
  },

  logo: {
    position: 'relative',
    textAlign: 'center',
    minWidth: '250px !important',
  },
  rightParentGrid: {
    width: '100%',
    minHeight: '100%',
    background: `url(${loginBackground}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '5rem 8rem',
    display: 'flex',
    flexWrap: 'wrap',
  },
  logoAlign: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
  },
}))

const Login = () => {
  const classes = useStyles()
  const { authError } = useSelector((state) => state.auth)
  const theme = useTheme()
  const history = useHistory()
  const [loginInfo] = useMutation(Login_USER) //{ data, loading, error }
  const { loginUser, loginFailue } = useActions()
  // const { authError } = useSelector((state) => state.auth);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [showPassword, setShowPassword] = useState(false)
  const buttonColors = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  }
  const initialValues = {
    email: '',
    password: '',
    authType: 'normal',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string().required('password is required'),
  })

  const onSubmit = async (values, onSubmitProps) => {
    let isMounted = true

    try {
      const { email, password, authType } = values
      if (isMounted) {
        const { data } = await loginInfo({
          variables: {
            data: { email, password, authType },
          },
        })

        loginUser({
          data: data,
          messages: {
            message: 'Login sucessful',
            type: 'success',
          },
        })
        if (data) {
          const { email, _id, access_token } = data.login.account
          setAccessToken(access_token)
          localStorage.setItem('pharmacyId', _id)
          localStorage.setItem('pharmacy_Email', email)
          // localStorage.setItem('userTypeId', userTypeId)
          history.push('/')
        }
      }
    } catch (error) {
      loginFailue({
        message: error.message,
        type: 'error',
      })
    }

    onSubmitProps.resetForm()
    return () => (isMounted = false)
  }

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item lg={6} className={classes.leftParentGrid}>
          <Grid
            item
            container
            direction="column"
            className={classes.peopleImgWrapper}
          >
            <Grid item className={classes.overlay}></Grid>
            <Grid item className={classes.peopleBgImage}></Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} sm={10} className={classes.rightParentGrid}>
          <Grid item className={classes.logoAlign}>
            <img src={logo} alt="Brand logo" className={classes.logo} />
          </Grid>
          {Object.keys(authError).length > 0 && (
            <Alert
              variant="filled"
              severity={authError.type}
              sx={{ justifyContent: 'center' }}
            >
              {authError.message}
            </Alert>
          )}

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnMount
          >
            {({ isSubmitting, isValid, dirty }) => {
              return (
                <Form>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    style={{ height: '100%' }}
                  >
                    <Grid item style={{ marginBottom: '3rem' }}>
                      <Typography variant="h2" style={{ fontSize: '5rem' }}>
                        Sign into your account
                      </Typography>
                    </Grid>
                    <Grid item style={{ marginBottom: '2rem' }}>
                      <Grid container direction="column">
                        <LoginInput
                          label="Email address"
                          name="email"
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          hasStartIcon={false}
                        />
                      </Grid>
                    </Grid>
                    <Grid item style={{ marginBottom: '2rem' }}>
                      <Grid container direction="column">
                        <LoginInput
                          id="password"
                          label="password"
                          name="password"
                          placeholder="Enter your password"
                          type={showPassword ? 'text' : 'password'}
                          hasStartIcon={false}
                          endAdornment={
                            <InputAdornment
                              position="end"
                              onClick={() => setShowPassword((prev) => !prev)}
                              style={{ cursor: 'pointer' }}
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </InputAdornment>
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid item style={{ marginBottom: '5rem' }}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Grid container alignItems="center">
                            <Grid item>
                              <Checkbox
                                {...label}
                                defaultChecked
                                color="success"
                              />
                            </Grid>
                            <Grid item>
                              <Typography variant="body1">
                                Remember me
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="body1"
                            color="error"
                            component={Link}
                            to="forgot-password"
                            className={classes.link}
                          >
                            Forgot password?
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <CustomButton
                        title="Login"
                        width="100%"
                        type={buttonColors}
                        disableRipple
                        isSubmitting={isSubmitting}
                        disabled={!(dirty || isValid)}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      alignItems="center"
                      style={{ marginTop: '2rem' }}
                    >
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.common.grey }}
                          paddingRight
                        >
                          Dont have an account?
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="h5"
                          color="primary"
                          component={Link}
                          to="/signup"
                          className={classes.link}
                        >
                          Sign up
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </>
  )
}

Login.propTypes = {
  history: PropTypes.object,
}

export default Login
