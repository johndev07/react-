import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
} from "@mui/material";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { defaultValues, Schema } from "../types/schema";
import RHFAutocomplete from "../../components/RHFAutocomplete";
import {
  useGender,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../services/queries";
import RHFToggleButtonGroup from "../../components/RHFToggleButtonGroup";
import RHFRadioGroup from "../../components/RHFRadioGroup";
import { useEffect } from "react";
import RHFCheckbox from "../../components/RHFCheckbox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import RHFSlider from "../../components/RHFSlider";
import RHFSwitch from "../../components/RHFSwitch";
import RHFTextField from "../../components/RHFTextField";

const Users = () => {
  const {
    control,
    formState: { errors },
    watch,
    unregister,
    reset,
    setValue,
  } = useFormContext<Schema>();
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const genderQuery = useGender();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  useEffect(() => {
    const { unsubscribe } = watch((val) => {
      console.log(val);
    });
    return () => {
      unsubscribe();
    };
  }, [watch]);

  const isTeacher = useWatch({ control, name: "isTeacher" });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  const id = useWatch({ control, name: "id" });

  const userQuery = useUser(id);
  function handleUserClick(id: string) {
    setValue("id", id);
  }

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
    }
    unregister("students");
  }, [isTeacher, replace, unregister]);

  function handleReset() {
    reset(defaultValues);
  }

  return (
    <>
      <Container maxWidth="sm" component="form">
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
          <List subheader={<ListSubheader>Users</ListSubheader>}>
            {usersQuery.data?.map((user) => (
              <ListItem disablePadding key={user.id}>
                <ListItemButton
                  onClick={() => handleUserClick(user.id)}
                  selected={id === user.id}
                >
                  <ListItemText primary={user.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Stack sx={{ gap: 2 }}>
            <RHFTextField name="name" label="name" />
            <RHFTextField name="email" label="email" />

            <RHFAutocomplete<Schema>
              name="state"
              options={statesQuery.data}
              label="movies"
            />
            <RHFToggleButtonGroup<Schema>
              label=""
              name="languages"
              options={languagesQuery.data}
            />
            <RHFRadioGroup<Schema>
              name="gender"
              label="gender"
              options={genderQuery.data}
            />
            <RHFCheckbox<Schema>
              name="skills"
              options={skillsQuery.data}
              label="Skills"
            />
            <RHFDateTimePicker<Schema>
              name="registerationDateAndTime"
              label="date time"
            />
            <RHFSlider<Schema>
              name="salaryRange"
              label="salary"
              min={0}
              max={2000}
            />
            <RHFSwitch<Schema> label="teacher" name="isTeacher" />
            {isTeacher && (
              <Button onClick={() => append({ name: "" })} type="button">
                Add a new Student
              </Button>
            )}

            {fields.map((field, index) => (
              <>
                <RHFTextField
                  label="Name"
                  key={field.id}
                  name={`students.${index}.name`}
                />
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  color="error"
                >
                  Remove Students
                </Button>
              </>
            ))}
            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button type="submit">New User</Button>
              <Button type="reset" onClick={handleReset}>
                Reset
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Users;
