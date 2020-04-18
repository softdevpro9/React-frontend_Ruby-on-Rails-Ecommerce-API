import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const SelectList = ({ collections }) => {
  const classes = useStyles();
  //const [collection, setCollection] = useState('');
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const collectionSelected = useSelector(state => state.control.selectListSelected);
  const handleChange = (event) => {
    console.log('event.target.value');console.log(event.target.value);console.log('event.target.value');
    dispatch({type: 'SET_SELECTLIST_INDEX', value: event.target.value});
  };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="collection-select-label">Collection</InputLabel>
      <Select
        labelId="collection-select-label"
        id="collection-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={collectionSelected}
        onChange={handleChange}
      >
        <MenuItem key="none" value="0"><em>All</em></MenuItem>
        {collections.map(collection => {
          return (
            <MenuItem
              key={collection.title}
              value={collection.id}>
                <em>{collection.title}</em>
            </MenuItem>
          )
        } )}
      </Select>
    </FormControl>
  );
};

export default SelectList;