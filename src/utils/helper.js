import { ICONS } from "../assets";

export const getPasswordStrength = (password) => {
  return [
    {
      label: "At least 8 characters",
      passed: password.length >= 8,
    },
    {
      label: "One lowercase letter",
      passed: /[a-z]/.test(password),
    },
    {
      label: "One uppercase letter",
      passed: /[A-Z]/.test(password),
    },
    {
      label: "One number [0-9]",
      passed: /\d/.test(password),
    },
    {
      label: "One special character",
      passed: /[@$!%*?&#^()\-_=+{};:,<.>]/.test(password),
    },
  ];
};

export const navItems = [
  { id: "users", label: "Users", icon: ICONS.Person },
  { id: "tasks", label: "Tasks", icon: ICONS.Assignment },
];
