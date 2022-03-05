import React from 'react'
import PropTypes from 'prop-types'
import { Files, Input, DateTimePicker, Selects, FormRadio, Checkbox } from '.'

const FormikControl = (props) => {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
    case 'select':
      return <Selects {...rest} />
    case 'checkbox':
      return <Checkbox {...rest} />
    case 'radio':
      return <FormRadio {...rest} />
    case 'time':
      return <DateTimePicker {...rest} />
    case 'file':
      return <Files {...rest} />
    default:
      return null
  }
}
FormikControl.propTypes = {
  control: PropTypes.string.isRequired,
}
export default FormikControl
