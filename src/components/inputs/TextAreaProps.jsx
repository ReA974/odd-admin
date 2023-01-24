import React from 'react';
import { TextareaAutosize } from '@mui/material';
import PropTypes from 'prop-types';

function TextAreaProps({
  ariaLabel, placeholder, minRows, value, width,
}) {
  return (
    <TextareaAutosize
      aria-label={ariaLabel}
      minRows={minRows}
      value={value}
      placeholder={placeholder}
      style={{ width: { width } }}
    />
  );
}

TextAreaProps.propTypes = {
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
  minRows: PropTypes.number,
  value: PropTypes.string,
  width: PropTypes.string,
};

TextAreaProps.defaultProps = {
  placeholder: null,
  ariaLabel: null,
  minRows: null,
  value: '',
  width: '200px',
};

export default TextAreaProps;
