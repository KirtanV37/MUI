import { useMemo } from "react";
import { URLS } from "../utils/urls";
import HomePage from "../components/HomePage";
import Users from "../components/Users";
import Tasks from "../components/Tasks";
import Register from "../components/Register";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";
import TaskCreation from "../components/TaskCreation";
import UserDashboard from "../components/UserDashboard";

const useRoute = () => {
  const allRoutes = useMemo(
    () => [
      {
        id: "root",
        path: URLS.INITIAL,
        element: HomePage,
        isPublic: true,
        isPrivate: true,
      },
      {
        id: "login",
        path: URLS.LOGIN,
        element: Login,
        isPublic: true,
      },
      {
        id: "forgot",
        path: URLS.FORGOT,
        element: ForgotPassword,
        isPublic: true,
      },
      {
        id: "register",
        path: URLS.REGISTER,
        element: Register,
        isPublic: true,
      },
      {
        id: "dashboard",
        path: URLS.DASHBOARD,
        element: UserDashboard,
        isPrivate: true,
      },
      {
        id: "user",
        path: URLS.USERS,
        element: Users,
        isPrivate: true,
      },
      {
        id: "task",
        path: URLS.TASKS,
        element: Tasks,
        isPrivate: true,
      },
      {
        id: "create",
        path: URLS.CREATE,
        element: TaskCreation,
        isPrivate: true,
      },
    ],
    []
  );

  const publicRoutes = useMemo(
    () => allRoutes.filter((route) => route.isPublic),
    [allRoutes]
  );

  const privateRoutes = useMemo(
    () => allRoutes.filter((route) => route.isPrivate),
    [allRoutes]
  );

  return { allRoutes, privateRoutes, publicRoutes };
};

export default useRoute;
