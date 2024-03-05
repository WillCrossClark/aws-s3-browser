import React from "react";
import { TextField } from "@mui/material";

interface SearchFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ onChange }) => (
  <TextField
    label="Search by file name"
    variant="outlined"
    fullWidth
    margin="normal"
    onChange={onChange}
  />
);

export default SearchField;
