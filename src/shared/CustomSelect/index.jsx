import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CustomSelect = ({ limit, setLimit, limitOptions = [], ...props }) => {
    const handleChange = (e) => {
        setLimit(Number(e.target.value));
        console.log("limit:-", limit);
    };

    return (
        <Box sx={{ maxWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>Page</InputLabel>
                <Select label="Page" value={limit} onChange={handleChange} {...props}>
                    {limitOptions.map((num) => (
                        <MenuItem key={num} value={num}>
                            {num}
                        </MenuItem>
                    ))}
                    {/* {limitOptions.map((num) => {
                        const { value, label } = num
                        return (
                            <MenuItem key={label ? label : num} value={value ? value : num}>
                                {num}
                            </MenuItem>
                        )
                    })} */}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CustomSelect;
