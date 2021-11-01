import React, { useEffect } from 'react'
import useFormInput from 'components/hooks/useFormInput'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import displayPhoto from 'assets/images/avatar.png'
import FormControl from '@mui/material/FormControl'
import FormInput from 'components/Utilities/FormInput'

const useStyles = makeStyles((theme) => ({
  btn: {
    '&.MuiButton-root': {
      ...theme.typography.btn,
      width: '100%',
    },
    image: {
      '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: 'ripple 1.2s infinite ease-in-out',
          border: '1px solid currentColor',
          content: '""',
        },
      },
      '@keyframes ripple': {
        '0%': {
          transform: 'scale(.8)',
          opacity: 1,
        },
        '100%': {
          transform: 'scale(2.4)',
          opacity: 0,
        },
      },
    },
  },
}))

const Profile = ({
  selectedMenu,
  selectedSubMenu,
  setSelectedMenu,
  setSelectedSubMenu,
}) => {
  const classes = useStyles()

  const [formInput, handleFormInput] = useFormInput({
    firstName: '',
    email: '',
    phone: '',
    password: '',
  })

  useEffect(() => {
    setSelectedMenu(11)
    setSelectedSubMenu(12)

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu])

  const { firstName, email, password, phone } = formInput

  return (
    <>
      <Grid container direction="column" md={5}>
        <Grid item>
          <Avatar src={displayPhoto} sx={{ height: '15rem', width: '15rem' }} />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <FormInput
              label="Name"
              labelId="Name"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleFormInput}
              placeholder="Choose Date"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <FormInput
              label="Email"
              labelId="Email"
              id="Email"
              as="email"
              type="email"
              value={email}
              onChange={handleFormInput}
              placeholder="Enter Email"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <FormInput
              as="number"
              label="Phone Number"
              labelId="phone"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleFormInput}
              placeholder="Enter phone number"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <FormInput
              label="Password"
              labelId="Password"
              type="password"
              id="Password"
              name="password"
              value={password}
              onChange={handleFormInput}
              placeholder="Enter Password"
            />
          </FormControl>
        </Grid>
        <Grid item container marginTop={4}>
          <Button
            variant="contained"
            type="submit"
            className={classes.btn}
            // onClick={handleDialogCloses}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
Profile.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
}

export default Profile
