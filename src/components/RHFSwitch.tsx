import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T> = {
  name: Path<T>;
  label: string;
};

const RHFSwitch = <T extends FieldValues>({ name, label }: Props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked {...field} />}
              label={label}
            />
          </FormGroup>
        );
      }}
    />
  );
};

export default RHFSwitch;
