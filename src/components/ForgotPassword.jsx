import * as yup from "yup";
import CustomAuthForm from "../shared/CustomAuthForm/index";
import { forgotPassFields } from "../utils/formFields";
import { api } from "../api/client";

const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required")
        .test(
            "checkUserExists",
            "User with this email does not exist",
            async (value) => {
                if (!value) return false;
                try {
                    const response = await api.USERS.getAll({ params: { email: value } });
                    console.log("response: ", response[0]);
                    return response;
                } catch (err) {
                    console.log("err", err);
                    return false;
                }
            }
        ),
    new: yup
        .string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters")
        .test(
            "isDifferentFromOldPassword",
            "New password must be different from old password",
            async function (value) {
                console.log("value", value);
                const { email } = this.parent;
                if (!value || !email) return false;
                try {
                    const response = await api.USERS.getAll({ params: { email } });
                    console.log("New response: ", response[0]);
                    const user = response?.[0];
                    return user?.password && user.password !== value;
                } catch (err) {
                    console.log("err", err);
                    return false;
                }
            }
        ),
    confirm: yup
        .string()
        .oneOf([yup.ref("new"), null], "Passwords must match")
        .required("Confirm password is required"),
});

const ForgotPassword = () => {
    const handleForgot = async (values) => {
        try {
            // 1. Find the user by email
            const response = await api.USERS.getAll({
                params: { email: values.email },
            });
            const user = response?.[0];

            if (!user) {
                alert("User with this email does not exist");
                return;
            }

            // 2. Patch the user's password
            await api.USERS.patch({
                id: user.id,
                data: { password: values.new },
            });

            alert("Password updated successfully!");
        } catch (error) {
            console.error("Error during password reset", error);
            alert("Failed to update password.");
        }
    };

    return (
        <CustomAuthForm
            label="Reset Password"
            fields={forgotPassFields}
            onSubmit={handleForgot}
            schema={forgotPasswordSchema}
        />
    );
};

export default ForgotPassword;

/*
const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    new: yup.string().required("New password is required").min(8),
    confirm: yup
        .string()
        .oneOf([yup.ref("new"), null], "Passwords must match")
        .required("Confirm password is required"),
});
*/

/*
const handleForgot = async (values) => {
    console.log('values', values)
    try {
        const response = await api.USERS.getAll({ params: { email: values.email } });
        console.log('response', response?.[0])
        const user = response?.[0];

        if (!user) {
            alert("User with this email does not exist");
            return;
        }

        if (user.password === values.new) {
            alert("New password must be different from old password");
            return;
        }
        await api.USERS.patch({ id: user.id, data: { password: values.new } })
        // Proceed with password reset logic here
        console.log("Reset password values", values);
    } catch (error) {
        console.error("Error during password reset", error);
    }
};
*/

/*
    const handleForgot = (values) => {
        console.log("values", values);
    }
*/
