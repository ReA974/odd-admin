import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';

function SelectObjectProps({
  label, dataSelectable, valueComponent, setValueComponent, multiple, width,
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValueComponent(
      typeof value === 'number' ? value.split(',') : value,
    );
  };

  return (
    <FormControl sx={{ m: 1, width: { width } }}>
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
          <MenuItem key={`${label}-select-${data}`} value={Number(data)}>{dataSelectable[data].name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectObjectProps.propTypes = {
  label: PropTypes.string.isRequired,
  dataSelectable: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  valueComponent: PropTypes.instanceOf(Object),
  setValueComponent: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  width: PropTypes.string,
};

SelectObjectProps.defaultProps = {
  valueComponent: null,
  multiple: false,
  width: '200px',
};

export default SelectObjectProps;
