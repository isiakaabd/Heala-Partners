import React, { useEffect, useState } from 'react'
import DeleteOrDisable from 'components/modals/DeleteOrDisable'
import PropTypes from 'prop-types'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { menus } from 'helpers/asideMenus'
import { makeStyles } from '@mui/styles'
import logo from 'assets/images/logo.svg'
import { Link, useLocation } from 'react-router-dom'
import { HiLogout } from 'react-icons/hi'
import { useActions } from 'components/hooks/useActions'

const useStyles = makeStyles((theme) => ({
  aside: {
    width: '34rem',
    background: '#fff',
    paddingLeft: '2.5em',
    paddingRight: '2.5em',
    paddingTop: '5em',
    height: '100vh',
    boxShadow: '5px -5px 7px #eee',
    position: 'fixed',
    overflowY: 'hidden',
    zIndex: theme.zIndex.appBar + 1,

    '&:hover': {
      overflowY: 'scroll',
    },

    '& .MuiListItemButton-root': {
      marginBottom: '2em',

      '&:hover': {
        background: theme.palette.common.lightGreen,

        '& .MuiSvgIcon-root': {
          color: theme.palette.common.green,
        },

        '& .MuiTypography-root': {
          color: theme.palette.common.green,
        },

        '& .message-icon': {
          color: theme.palette.common.green,
        },
      },
    },

    '& .MuiListItemIcon-root': {
      minWidth: 50,
    },

    '& .MuiSvgIcon-root': {
      fontSize: '2rem',

      '&:hover': {
        color: theme.palette.common.green,
      },
    },

    '& .MuiTypography-root': {
      fontSize: '1.45rem',
    },

    '& .MuiListItemButton-root.Mui-selected': {
      backgroundColor: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
      borderRadius: '.5rem',

      '&:hover': {
        backgroundColor: theme.palette.common.lightGreen,
      },

      '& .MuiListItemIcon-root': {
        color: theme.palette.common.green,
      },

      '& .MuiTypography-root': {
        color: theme.palette.common.green,
      },
    },

    '&::-webkit-scrollbar': {
      width: '.85rem',
    },

    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 1rem rgba(0, 0, 0, 0.2)',
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: '.5rem',
      background: theme.palette.common.lightGrey,
    },
  },
  logoWrapper: {
    paddingTop: '3em',
    paddingBottom: '5em',
    paddingLeft: '7em',
  },
  logout: {
    '&.MuiListItemButton-root': {
      marginTop: '2.5rem',

      '& .MuiListItemIcon-root': {
        color: theme.palette.common.green,
      },

      '& .MuiTypography-root': {
        color: theme.palette.common.green,
      },
    },
  },
}))

const SideMenu = (props) => {
  const {
    selectedMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    setWaitingListMenu,
  } = props

  const { logout } = useActions()

  const classes = useStyles()
  const [Logout, setLogout] = useState(false)
  const location = useLocation()

  const handleLogout = () => {
    setSelectedMenu(12)
    logout()
  }

  useEffect(
    () =>
      // eslint-disable-next-line
      [...menus].filter((menu) => {
        switch (location.pathname) {
          case menu.path:
            if (menu.id !== selectedMenu) {
              setSelectedMenu(menu.id)
            }
            break
          default:
            break
        }
      }),
    // eslint-disable-next-line
    [selectedMenu],
  )

  return (
    <>
      <aside className={classes.aside}>
        <div className={classes.logoWrapper}>
          <img src={logo} alt="logo" />
        </div>
        <List>
          {menus.map((menu) => (
            <ListItemButton
              disableRipple
              key={menu.id}
              onClick={() => {
                setSelectedMenu(menu.id)
                setSelectedSubMenu(0)
                setWaitingListMenu(0)
              }}
              selected={selectedMenu === menu.id}
              component={Link}
              to={menu.path}
            >
              <ListItemIcon>
                {React.createElement(
                  menu.icon,
                  menu.id === 5 ? { size: 20, className: 'message-icon' } : {},
                )}
              </ListItemIcon>

              <ListItemText>{menu.title}</ListItemText>
            </ListItemButton>
          ))}
          <ListItemButton
            disableRipple
            classes={{ root: classes.logout }}
            onClick={() => setLogout(true)}
          >
            <ListItemIcon>
              <HiLogout size={20} />
            </ListItemIcon>

            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </List>
      </aside>
      <DeleteOrDisable
        open={Logout}
        setOpen={setLogout}
        title="Logout"
        confirmationMsg="logout"
        btnValue="Logout"
        type="logout"
        onConfirm={handleLogout}
      />
    </>
  )
}

SideMenu.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setWaitingListMenu: PropTypes.func.isRequired,
}

export default SideMenu
