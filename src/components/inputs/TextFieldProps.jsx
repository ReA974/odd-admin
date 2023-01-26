import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

function TextFieldProps({
  id, label, variant, type, helperText, required, value, setValueComponent, error, width,
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
          error={error}
          sx={{ width: { width } }}
          helperText={helperText}
          onChange={(event) => setValueComponent(event.target.value)}
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
          error={error}
          sx={{ width: { width } }}
          helperText={helperText}
          onChange={(event) => setValueComponent(event.target.value)}
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
  setValueComponent: PropTypes.func.isRequired,
  error: PropTypes.bool,
  width: PropTypes.string,
};

TextFieldProps.defaultProps = {
  variant: 'outlined',
  type: 'text',
  id: null,
  helperText: null,
  required: false,
  value: '',
  error: false,
  width: '100%',
};

export default TextFieldProps;
