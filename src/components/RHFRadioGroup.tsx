import React from "react";
import { Option } from "../types/option";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type Props<T> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

const RHFRadioGroup = <T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <FormControl {...field} error={!!error}>
              <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Male"
                name={label}
              >
                {options?.map(({ id, label }) => {
                  return (
                    <FormControlLabel
                      key={id}
                      value={label}
                      control={<Radio />}
                      label={label}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </>
        );
      }}
    />
  );
};

export default RHFRadioGroup;
