import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
type Props<T> = {
  name: Path<T>;
  label: string;
};

export const RHFDateTimePicker = <T extends FieldValues>({
  name,
  label,
}: Props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...rest } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label={label}
              {...rest}
              value={dayjs(value)}
              onChange={(e) => onChange(e?.toDate())}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};
