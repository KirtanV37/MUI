import CustomAuthForm from "../shared/CustomAuthForm";
import { loginFields } from "../utils/formFields";
import { loginSchema } from "../utils/validations";
import { loginUser } from "../redux/slices/user.slices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { URLS } from "../utils/urls";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        console.log("values", values);
        try {
            const userData = {
                email: values.email,
                password: values.password,
            };
            console.log("userData: ", userData);

            await dispatch(loginUser(userData)).unwrap();
            navigate(URLS.INITIAL);
        } catch (error) {
            console.error("Login failed:", error);
            navigate(URLS.FORGOT);
            // Optionally, you can show an error message to the user
            // For example, using a toast notification or an alert
        }
    };

    return (
        <CustomAuthForm
            label="Login"
            fields={loginFields}
            schema={loginSchema}
            onSubmit={handleSubmit}
        />
    );
};

export default Login;
