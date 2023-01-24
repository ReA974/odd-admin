import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

function TextFieldProps({
  id, label, variant, type, helperText, required, value,
}) {
  return (
    required
      ? (
        <TextField
          id={id}
          label={label}
          variant={variant}
          type={type}
          value={value}
          helperText={helperText}
          required
        />
      )
      : (
        <TextField
          id={id}
          label={label}
          variant={variant}
          type={type}
          value={value}
          helperText={helperText}
        />
      )
  );
}

TextFieldProps.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
};

TextFieldProps.defaultProps = {
  variant: 'outlined',
  type: 'text',
  id: null,
  helperText: null,
  required: false,
  value: '',
};

export default TextFieldProps;
