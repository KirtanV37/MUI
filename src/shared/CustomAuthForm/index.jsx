import { useForm, Controller } from "react-hook-form";
import {
    Box,
    Stack,
    InputAdornment,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    MenuItem,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomButton from "../CustomButton/index";
import CustomTextField from "../CustomTextField/index";
import { useState } from "react";
import { getPasswordStrength } from "../../utils/helper";
import CustomSingleDatePicker from "../CustomSingleDatePicker";

const CustomAuthForm = ({ fields, schema, onSubmit, label }) => {
    const [passwordValue, setPasswordValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched",
        defaultValues: Object.fromEntries(fields.map((f) => [f.name, ""])),
    });

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    spacing={2}
                    sx={{
                        width: 300,
                        padding: 2,
                        transition: "transform 0.25s ease, box-shadow 0.25s ease",
                        transform: "scale(1)",
                        ":hover": {
                            boxShadow: 2,
                            transform: "scale(1.05)",
                        },
                    }}
                >
                    {fields.map((field) => {
                        const { name, label, type, component, options } = field;

                        return (
                            <Controller
                                key={name}
                                name={name}
                                control={control}
                                render={({ field }) => {
                                    if (component === "text" || component === "password") {
                                        const isPassword = type === "password";

                                        return (
                                            <>
                                                <CustomTextField
                                                    {...field}
                                                    label={label}
                                                    type={
                                                        isPassword && !showPassword ? "password" : "text"
                                                    }
                                                    error={!!errors[name]}
                                                    onChange={(e) => {
                                                        if (isPassword) setPasswordValue(e.target.value);
                                                        field.onChange(e);
                                                    }}
                                                    slotProps={
                                                        isPassword
                                                            ? {
                                                                input: {
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <span
                                                                                onClick={() =>
                                                                                    setShowPassword((prev) => !prev)
                                                                                }
                                                                                style={{ cursor: "pointer" }}
                                                                            >
                                                                                {showPassword ? (
                                                                                    <VisibilityOff />
                                                                                ) : (
                                                                                    <Visibility />
                                                                                )}
                                                                            </span>
                                                                        </InputAdornment>
                                                                    ),
                                                                },
                                                            }
                                                            : undefined
                                                    }
                                                />
                                                {errors[name] && (
                                                    <span style={{ color: "#f44336", fontSize: 12 }}>
                                                        {errors[name]?.message}
                                                    </span>
                                                )}
                                            </>
                                        );
                                    }

                                    if (component === "radio") {
                                        return (
                                            <FormControl error={!!errors[name]}>
                                                <FormLabel>{label}</FormLabel>
                                                <RadioGroup {...field}>
                                                    {options.map((option) => (
                                                        <FormControlLabel
                                                            key={option}
                                                            value={option}
                                                            control={<Radio />}
                                                            label={
                                                                option.charAt(0).toUpperCase() + option.slice(1)
                                                            }
                                                        />
                                                    ))}
                                                </RadioGroup>
                                                {errors[name] && (
                                                    <span style={{ color: "#f44336", fontSize: 12 }}>
                                                        {errors[name]?.message}
                                                    </span>
                                                )}
                                            </FormControl>
                                        );
                                    }
                                    if (component === "date") {
                                        return (
                                            <>
                                                <CustomSingleDatePicker
                                                    {...field}
                                                    label={label}
                                                    value={field.value ?? null}
                                                    error={!!errors[name]}
                                                    onChange={field.onChange}
                                                />
                                                {errors[name] && (
                                                    <span style={{ color: "#f44336", fontSize: 12 }}>
                                                        {errors[name]?.message}
                                                    </span>
                                                )}
                                            </>
                                        );
                                    }
                                    if (component === "select") {
                                        return (
                                            <>
                                                <CustomTextField
                                                    {...field}
                                                    label={label}
                                                    select
                                                    error={!!errors[name]}
                                                >
                                                    {options.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                                        </MenuItem>
                                                    ))}
                                                </CustomTextField>
                                                {errors[name] && (
                                                    <span style={{ color: "#f44336", fontSize: 12 }}>
                                                        {errors[name]?.message}
                                                    </span>
                                                )}
                                            </>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        );
                    })}

                    {/* Optional: Password strength */}
                    {passwordValue && (
                        <Stack spacing={0.5}>
                            {getPasswordStrength(passwordValue).map((strength, index) => (
                                <span
                                    key={index}
                                    style={{
                                        color: strength.passed ? "green" : "red",
                                        fontSize: 12,
                                    }}
                                >
                                    {strength.label}
                                </span>
                            ))}
                        </Stack>
                    )}

                    <CustomButton type="submit">{label}</CustomButton>
                </Stack>
            </form>
        </Box>
    );
};

export default CustomAuthForm;
