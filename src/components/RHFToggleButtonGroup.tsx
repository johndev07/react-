import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type props<T> = {
  name: Path<T>;
  label: string;
  options?: Option[];
};

const RHFToggleButtonGroup = <T extends FieldValues>({
  name,
  label,
  options,
}: props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value = ["English"], onChange, ...rest } }) => {
        return (
          <>
            <ToggleButtonGroup
              value={value}
              defaultChecked
              onChange={(_, val) => {
                if (val.length >= 1) {
                  onChange(val);
                }
              }}
              aria-label={label}
              {...rest}
            >
              {options?.map(({ id, label }) => {
                return (
                  <ToggleButton value={label} aria-label={label} key={id}>
                    {label}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </>
        );
      }}
    />
  );
};

export default RHFToggleButtonGroup;
