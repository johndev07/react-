import { Slider } from "@mui/material";
import { Controller, FieldValues, Path } from "react-hook-form";

type Props<T> = {
  name: Path<T>;
  label: string;
  min: number;
  max: number;
};

const RHFSlider = <T extends FieldValues>({
  name,
  label,
  min,
  max,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      render={({ field }) => {
        return (
          <Slider
            getAriaLabel={() => "Minimum distance shift"}
            min={min}
            max={max}
            aria-label={label}
            {...field}
            valueLabelDisplay="auto"
            disableSwap
          />
        );
      }}
    />
  );
};

export default RHFSlider;
