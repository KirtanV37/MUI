import CustomButton from "../shared/CustomButton";

const Demo = () => {
    return (
        <>
            <CustomButton variant="contained">Save</CustomButton>
            <CustomButton variant="outlined">Cancel</CustomButton>
            <CustomButton variant="text">Delete</CustomButton>
            <CustomButton>Submit</CustomButton>
        </>
    );
};

export default Demo;
