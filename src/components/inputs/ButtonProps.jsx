import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ButtonProps({
  variant, text, to, component,
}) {
  return (
    component
      ? <Button variant={variant} component={Link} to={to}>{text}</Button>
      : <Button variant={variant}>{text}</Button>
  );
}

ButtonProps.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  to: PropTypes.string,
  component: PropTypes.bool,
};

ButtonProps.defaultProps = {
  variant: 'contained',
  to: null,
  component: false,
};

export default ButtonProps;
