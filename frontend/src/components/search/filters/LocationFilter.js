import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import states from "./states.json";

export default function LocationFilter(props) {
  const handleSelectState = (values) => {
    let states = values.map((v) => v.code);
    props.navigate(props.id, states);
  };

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={states}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Location"
          placeholder="Select State"
        />
      )}
      onChange={(e, v) => handleSelectState(v)}
    />
  );
}
