import withPublic from "../hoc/with-Public";
import { Outlet } from "react-router-dom";

const PrivateLayout = withPublic(Outlet);

export default PrivateLayout;
