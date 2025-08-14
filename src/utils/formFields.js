export const registerFields = [
  {
    name: "name",
    label: "Enter a name",
    type: "text",
    component: "text",
  },
  {
    name: "email",
    label: "Enter your email",
    type: "email",
    component: "text",
  },
  {
    name: "password",
    label: "Enter your password",
    type: "password",
    component: "password",
  },
  {
    name: "role",
    label: "Role",
    component: "radio",
    options: ["admin", "user"],
  },
];

export const loginFields = [
  {
    name: "email",
    label: "Enter your email",
    type: "email",
    component: "text",
  },
  {
    name: "password",
    label: "Enter your password",
    type: "password",
    component: "password",
  },
];

export const forgotPassFields = [
  {
    name: "email",
    label: "Enter your email",
    type: "email",
    component: "text",
  },
  {
    name: "new",
    label: "Enter your new password",
    type: "password",
    component: "password",
  },
  {
    name: "confirm",
    label: "Enter your confirm password",
    type: "password",
    component: "password",
  },
];

export const taskFields = [
  {
    name: "title",
    label: "Enter Task",
    type: "text",
    component: "text",
  },
  {
    name: "description",
    label: "Enter description",
    type: "text",
    component: "text",
  },
  {
    name: "dueDate",
    label: "Enter Due Date",
    type: "date",
    component: "date",
  },
  {
    name: "status",
    label: "Status of Task",
    type: "select",
    options: ["pending"],
    component: "select",
  },
];
