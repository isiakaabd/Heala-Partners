import React from 'react'

import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { Typography, Stack, Grid, Box, Modal } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    '&.MuiSvgIcon-root': {
      fontSize: '2rem',
      cursor: 'pointer',

      '&:hover': {
        color: 'green',
      },
    },
  },
}))

const Modals = ({
  isOpen,
  handleClose,
  title,
  color,
  children,
  rowSpacing,
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 'auto',
    maxHeight: '600px',
    bgcolor: 'background.paper',
    borderRadius: '2rem',
    padding: '2rem',
  }

  const classes = useStyles()
  return (
    <Stack>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            padding={0}
            // rowSpacing={rowSpacing ? rowSpacing : 4}
            className={classes.modal}
            flexDirection="column"
          >
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
              // flex="2"
              flexWrap="nowrap"
            >
              <Grid item>
                <Typography variant="h3">{title ? title : ''}</Typography>
              </Grid>
              <Grid item marginLeft={0.3}>
                <CloseIcon
                  color={color ? color : 'secondary'}
                  className={classes.closeIcon}
                  onClick={handleClose}
                />
              </Grid>
            </Grid>
            <Grid item>{children}</Grid>
          </Grid>
        </Box>
      </Modal>
    </Stack>
  )
}
Modals.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  height: PropTypes.string,
  rowSpacing: PropTypes.number,
}

Modals.defaultProps = {
  height: '85vh',
}

export default Modals
