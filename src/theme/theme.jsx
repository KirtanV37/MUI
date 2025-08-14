import { createTheme } from "@mui/material/styles";
import { COLORS } from "../utils/colors";

const theme = createTheme({
    palette: {
        primary: COLORS.PRIMARY,
        secondary: COLORS.SECONDARY,
        error: COLORS.ERROR,
        warning: COLORS.WARNING,
        neutral: COLORS.NEUTRAL,
        accent: COLORS.ACCENT,
    },
    direction: "ltr",
    breakpoints: {
        values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
    zIndex: {
        drawer: 1300, // raise drawer
        appBar: 1400, // raise app bar above it
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
                size: "medium",
                disableElevation: true,
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600,
                    textTransform: "none",
                    padding: "8px 4px",
                    fontSize: "0.9rem",
                    boxShadow: "none",
                },
                text: {
                    color: COLORS.PRIMARY.main,
                    fontWeight: 400,
                    fontSize: "0.875rem",
                },
                outlined: {
                    border: `1px solid ${COLORS.NEUTRAL.main}`,
                    backgroundColor: "transparent",
                    "&:hover": {
                        backgroundColor: COLORS.NEUTRAL.light,
                    },
                },
                sizeSmall: {
                    fontSize: "0.8rem",
                    padding: "4px 8px",
                    minHeight: "32px",
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                fullWidth: true,
                size: "small",
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: COLORS.PRIMARY.main,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: COLORS.PRIMARY.light,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                    },
                },
                input: {
                    padding: "10px 12px",
                },
            },
        },
        /*
                        MuiDataGrid: {
                            defaultProps: {
                                autoHeight: true,
                            },
                            styleOverrides: {
                                columnHeaders: {
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    backgroundColor: "#f5f5f5",
                                },
                                row: {
                                    "& .hover": {
                                        backgroundColor: COLORS.ACCENT.main,
                                    },
                                },
                            },
                        },
                    */
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: "1px solid #e0e0e0",
                    borderRadius: 8,
                    fontSize: "0.875rem",
                    fontFamily: "Roboto, sans-serif",

                    // DataGrid internal class-based overrides
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "white",
                        color: "black",
                        fontSize: "1.1rem",
                        borderBottom: "1px solid #ccc",
                        "--unstable_DataGrid-headWeight": 900, // as fontWeight: 900 is not works properly.
                    },
                    "& .MuiDataGrid-cell": {
                        padding: "8px",
                        borderBottom: "1px solid #f0f0f0",
                    },
                    // "& .MuiDataGrid-row:hover": {
                    //     backgroundColor: COLORS.PRIMARY.light,
                    // },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "1px solid #e0e0e0",
                        backgroundColor: "#f9f9f9",
                    },
                    "& .MuiDataGrid-toolbarContainer": {
                        padding: "8px 16px",
                        borderBottom: "1px solid #e0e0e0",
                    },
                    // "& .MuiDataGrid-columnSeparator": {
                    //     display: "none", // Removes column resize handle
                    // },
                    "& .MuiDataGrid-sortIcon": {
                        color: COLORS.WARNING.main,
                    },
                    // "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
                    //     outline: "none",
                    // },
                    // "& .MuiDataGrid-selectedRowCount": {
                    //     visibility: "hidden",
                    // },
                },
            },
            defaultProps: {
                autoHeight: true,
                disableRowSelectionOnClick: true,
            },
        },
        MuiSelect: {
            defaultProps: {
                variant: "outlined",
            },
        },
        MuiDatePicker: {
            defaultProps: {
                slotProps: {
                    textField: {
                        variant: "outlined",
                        size: "small",
                        fullWidth: true,
                    },
                },
            },
            styleOverrides: {
                root: {
                    width: "100%",
                },
            },
        },
        MuiMenuItem: {
            defaultProps: {
                disableRipple: true,
            },
        },

    },
});

export default theme;
