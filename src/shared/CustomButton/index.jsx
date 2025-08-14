import { Button } from "@mui/material";

const CustomButton = ({ children, ...props }) => {
    return <Button {...props}>{children}</Button>;
};

export default CustomButton;
