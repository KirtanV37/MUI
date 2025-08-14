import useRoute from "../hooks/useRoute";
import { Route, Routes } from "react-router-dom";
import WithPublic from "../layout/public-layout";
import WithPrivate from "../layout/private-layout";
import NewNavbar from "../components/NewNavbar"
const Routing = () => {
    const { privateRoutes, publicRoutes } = useRoute();

    return (
        <Routes>
            {/* Private routes */}
            <Route path="/" element={<NewNavbar />}>
                {privateRoutes.map(({ id, element: Component, path, ...otherData }) => (
                    <Route key={id} path={path} element={<Component />} {...otherData} />
                ))}
            </Route>
            {/* Public routes */}
            <Route element={<WithPublic />}>
                {publicRoutes.map(({ id, element: Component, path, ...otherData }) => (
                    <Route key={id} path={path} element={<Component />} {...otherData} />
                ))}
            </Route>

            {/* 404 route */}
            <Route path="*" element={<p>404 | Not Found</p>} />
        </Routes>
    );
};

export default Routing;
