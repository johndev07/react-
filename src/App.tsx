import { FormProvider, useForm } from "react-hook-form";
import "./App.css";
import Users from "./users/components/Users";
import { defaultValues, schema, Schema } from "./users/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
function App() {
  const method = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <>
      <div className="formUser">
        <FormProvider {...method}>
          <Users />
        </FormProvider>
      </div>
      <DevTool control={method.control} />
    </>
  );
}

export default App;
