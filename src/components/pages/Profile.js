import React, { useEffect } from 'react'
import useFormInput from 'components/hooks/useFormInput'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import PreviousButton from 'components/Utilities/PreviousButton'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import displayPhoto from 'assets/images/avatar.png'
import FormControl from '@mui/material/FormControl'
import FormInput from 'components/Utilities/FormInput'
import Badge from '@mui/material/Badge'
import EditIcon from '@mui/icons-material/Edit'
import { styled } from '@mui/material/styles'

const useStyles = makeStyles((theme) => ({
  btn: {
    '&.MuiButton-root': {
      ...theme.typography.btn,
      width: '100%',
    },
  },
}))
const Icon = styled(EditIcon)(({ theme }) => ({
  '&.MuiBadge-badge': {
    background: 'red !important',
    '&::after': {
      content: '""',
    },
  },
  color: 'white',
  position: 'absolute',
  top: '100%',
  left: '10px',
  background: 'green',
  borderRadius: '50%',
  width: 20,
  height: 20,

  // border: `2px solid ${theme.palette.background.paper}`,
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
      <Grid item container direction="column" md={5} spacing={2}>
        <Grid item style={{ marginBottom: '3rem' }}>
          <PreviousButton path={'/settings'} />
        </Grid>
        <Grid item container>
          <Badge
            // variant="dot"
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<Icon />}
          >
            <Avatar
              src={displayPhoto}
              alt="name"
              sx={{ height: 100, width: 100 }}
            />
          </Badge>
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
              type="email"
              id="Email"
              name="email"
              value={email}
              onChange={handleFormInput}
              placeholder="Enter Email"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <FormInput
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
              type="Password"
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
