import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const SelectTab = props => {


  const classes = useStyles();
  const [selected, setSelected] = useState();
  const { collections } = props.collections;

  const handleChange = (event) => {
    const selectedCollection = event.target.value;
    setSelected(selectedCollection);
  };

  return (
    <FormControl className={classes.formControl}>
        <InputLabel htmlFor="collection-native-simple">Collection</InputLabel>
        <Select
          native
          value={selected}
          onChange={handleChange}
          inputProps={{
            name: 'collections',
            id: 'collection-native-simple',
          }}
        >
          <option aria-label="All" value="" />
          {collections.map(c => (
            <option
              key={c.id+c.title}
              value={c.id}>{c.title}
            </option>
          ))}
        </Select>
      </FormControl>
  )
};

export default SelectTab;