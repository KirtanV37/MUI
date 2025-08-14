import { Box, TextField } from "@mui/material";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const DateRangePicker = ({ startDate, setEndDate, setStartDate, endDate }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ display: "flex", gap: 2 }}>
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    slotProps={{ textField: { variant: "outlined", size: "small" } }}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    minDate={startDate}
                    slotProps={{ textField: { variant: "outlined", size: "small" } }}
                />
            </Box>
        </LocalizationProvider>
    );
};

export default DateRangePicker;
