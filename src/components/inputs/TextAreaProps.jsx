import React from 'react';
import { TextareaAutosize } from '@mui/material';
import PropTypes from 'prop-types';

function TextAreaProps({
  ariaLabel, placeholder, minRows, value, setValueComponent,
}) {
  return (
    <TextareaAutosize
      aria-label={ariaLabel}
      minRows={minRows}
      value={value}
      placeholder={placeholder}
      style={{
        width: '100%', resize: 'vertical', minWidth: '250px', marginTop: '7px', marginBottom: '7px',
      }}
      onChange={(event) => setValueComponent(event.target.value)}
    />
  );
}

TextAreaProps.propTypes = {
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
  minRows: PropTypes.number,
  value: PropTypes.string,
  setValueComponent: PropTypes.func.isRequired,
};

TextAreaProps.defaultProps = {
  placeholder: null,
  ariaLabel: null,
  minRows: null,
  value: '',
};

export default TextAreaProps;
