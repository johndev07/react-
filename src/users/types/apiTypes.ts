type Create = {
  variant: "create";
};
type Edit = {
  variant: "edit";
  id: string;
};

export type Common = {
  name: string;
  email: string;
  state: string[];
  languages: string[];
  gender: "Male" | "Female";
  skills: string[];
  registerationDateAndTime: Date;
  salaryRange: number[];
  isTeacher: boolean;
  students: {
    name: string;
  }[];
};

export type ApiCreateEdit = Common & (Create | Edit);
export type ApiGet = Edit & Common;
