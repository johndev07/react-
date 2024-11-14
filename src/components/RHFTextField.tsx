import { TextField } from "@mui/material";
import { Controller, Path } from "react-hook-form";

type Props = {
  name: Path<T>;
  label: string;
};
const RHFTextField = ({ name, label }: Props) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            label={label}
            helperText={error?.message}
            error={!!error}
          />
        );
      }}
    />
  );
};

export default RHFTextField;
