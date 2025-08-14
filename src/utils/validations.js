import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#^()\-_=+{};:,<.>]/,
      "Password must contain at least one special character"
    ),
  role: yup
    .string()
    .oneOf(["admin", "user"], "Choose a role")
    .required("Role is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#^()\-_=+{};:,<.>]/,
      "Password must contain at least one special character"
    ),
});

export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
  dueDate: yup
    .string()
    .required("Due date is required")
    .test("min", "Due date cannot be in the past", function (value) {
      if (!value) return false;
      const selected = new Date(value);
      selected.setHours(0, 0, 0, 0);
      return selected >= today;
    }),
});
