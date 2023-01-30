import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';

function SelectStringProps({
  label, dataSelectable, valueComponent, setValueComponent, multiple, width, maxWidth, minWidth,
}) {
  const handleChange = (event) => {
    const { target: { value } } = event;
    setValueComponent(value);
  };

  return (
    <FormControl sx={{
      m: 1, width, maxWidth, minWidth,
    }}
    >
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        multiple={multiple}
        value={valueComponent}
        label={label}
        onChange={handleChange}
      >
        {Object.keys(dataSelectable).map((data) => (
          <MenuItem key={`${label}-select-${data}`} value={dataSelectable[data].name}>{dataSelectable[data].name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectStringProps.propTypes = {
  label: PropTypes.string.isRequired,
  dataSelectable: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  valueComponent: PropTypes.string,
  setValueComponent: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
};

SelectStringProps.defaultProps = {
  valueComponent: '',
  multiple: false,
  width: '100%',
  maxWidth: undefined,
  minWidth: undefined,
};

export default SelectStringProps;
