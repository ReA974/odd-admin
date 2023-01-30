import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

function TextFieldProps({
  id, label, variant, type, helperText, required, value,
  setValueComponent, error, width, maxLength, placeHolder, margin,
  color, marginTop, marginLeft, marginRight, maxWidth, minWidth, marginBottom,
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
          sx={{
            width, margin, marginTop, marginLeft, marginRight, maxWidth, minWidth, marginBottom,
          }}
          color={color}
          helperText={helperText}
          onChange={(event) => setValueComponent(event.target.value)}
          placeholder={placeHolder}
          inputProps={{ maxLength }}
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
          sx={{
            width, margin, marginTop, marginLeft, marginRight, maxWidth, minWidth, marginBottom,
          }}
          color={color}
          helperText={helperText}
          onChange={(event) => setValueComponent(event.target.value)}
          placeholder={placeHolder}
          inputProps={{ maxLength }}
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
  maxLength: PropTypes.string,
  placeHolder: PropTypes.string,
  margin: PropTypes.string,
  color: PropTypes.string,
  marginTop: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  marginBottom: PropTypes.string,
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
  maxLength: null,
  placeHolder: null,
  margin: null,
  color: null,
  marginTop: null,
  marginLeft: null,
  marginRight: null,
  maxWidth: null,
  minWidth: null,
  marginBottom: null,
};

export default TextFieldProps;
