import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ButtonProps({
  variant, text, to, component, onClick,
}) {
  return (
    component
      ? <Button variant={variant} component={Link} to={to}>{text}</Button>
      : <Button variant={variant} onClick={onClick}>{text}</Button>
  );
}

ButtonProps.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  to: PropTypes.string,
  component: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonProps.defaultProps = {
  variant: 'contained',
  to: null,
  component: false,
  onClick: null,
};

export default ButtonProps;
