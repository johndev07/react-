import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";

type props<T> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

const RHFAutocomplete = <T extends FieldValues>({
  name,
  label,
  options = [],
}: props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value = [], onChange, ref },
        fieldState: { error },
      }) => (
        <>
          <Autocomplete
            options={options}
            multiple
            value={value.map((movieId) => {
              return options?.find((movie) => movie.id == movieId);
            })}
            getOptionLabel={(movie) => movie?.label || ""}
            onChange={(_, newValue) => {
              onChange(newValue.map((movie) => movie?.id));
            }}
            disableCloseOnSelect
            isOptionEqualToValue={(option, value) => option?.id == value?.id}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  variant="filled"
                  label={label}
                  placeholder="movies"
                  inputRef={ref}
                  error={!!error}
                  helperText={error?.message}
                />
              );
            }}
            renderOption={(props, option, { selected }) => (
              <Box {...props} component="li" key={option?.id}>
                <Checkbox
                  checkedIcon={<ImCheckboxChecked />}
                  icon={<ImCheckboxUnchecked />}
                  checked={selected}
                />
                {option?.label}
              </Box>
            )}
          />
        </>
      )}
    />
  );
};

export default RHFAutocomplete;
