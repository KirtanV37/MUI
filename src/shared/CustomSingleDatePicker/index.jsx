import { Box } from "@mui/material";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const CustomSingleDatePicker = ({ value, onChange, ...props }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ display: "flex", gap: 2 }}>
                <DatePicker
                    {...props}
                    value={value ? moment(value) : null} // value={moment(value).format("YYYY-MM-DD")}  // returns a string, not acceptable
                    onChange={(date) => onChange?.(date ? date : null)}
                />
            </Box>
        </LocalizationProvider>
    );
};

export default CustomSingleDatePicker;
