import { Option } from "../types/option";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { ChangeEvent } from "react";
type props<T> = {
  name: Path<T>;
  label: string;
  options?: Option[];
};

const RHFCheckbox = <T extends FieldValues>({
  name,
  label,
  options,
}: props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => {
        return (
          <FormControl error={!!error}>
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
              {options?.map(({ id, label }) => {
                return (
                  <FormControlLabel
                    key={id}
                    name={label}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const skill: string = e.target.name;
                      if (value.includes(skill)) {
                        onChange(value.filter((val) => val != skill));
                      } else {
                        onChange([...value, skill]);
                      }
                    }}
                    control={<Checkbox />}
                    label={label}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default RHFCheckbox;
