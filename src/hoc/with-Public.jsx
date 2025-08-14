import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { URLS } from "../utils/urls";

const withPublic = (RenderComponent) => {
    const WrappedComponent = (props) => {
        const currentUser = useSelector((state) => state.users.currentUser);
        console.log("With-Public currentUser: ", currentUser);

        if (currentUser?.role === "admin") {
            return <Navigate to={URLS.INITIAL} replace />;
        }

        if (currentUser?.role === "user") {
            return <Navigate to={URLS.DASHBOARD} replace />;
        }
        return <RenderComponent {...props} />;
    };

    WrappedComponent.displayName = `withPublic(${RenderComponent.displayName || RenderComponent.name || "Component"
        })`;

    return WrappedComponent;
};

export default withPublic;
