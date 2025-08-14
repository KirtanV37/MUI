import CustomAuthForm from "../shared/CustomAuthForm";
import { taskSchema } from "../utils/validations";
import { taskFields } from "../utils/formFields";
import moment from "moment";
import { api } from "../api/client";

const TaskCreation = () => {
    const handleSubmit = async (values) => {
        try {
            const formattedDate = moment(values.dueDate).format("YYYY-MM-DD");
            const formattedValues = {
                ...values,
                dueDate: formattedDate,
            };
            // console.log("values", values);
            console.log("Values:- ", formattedValues);
            await api.TASKS.create({ data: formattedValues });
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };
    return (
        <CustomAuthForm
            fields={taskFields}
            schema={taskSchema}
            onSubmit={handleSubmit}
            label="Create Task"
        />
    );
};

export default TaskCreation;
