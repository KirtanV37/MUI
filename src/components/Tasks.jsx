import { useEffect } from "react";
import CustomTable from "../shared/CustomTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/task.slices";
import { Box } from "@mui/material";
import CustomButton from "../shared/CustomButton";
import useCustomDateRange from "../hooks/useCustomDateRange";
import DateRangePicker from "./DateRangePicker";
import useFilter from "../hooks/useFilter";
import { ICONS } from "../assets/index";
import { updateTaskStatus } from "../redux/slices/task.slices";

const Tasks = () => {
    const { items, loading, error } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const { endDate, setEndDate, setStartDate, startDate } = useCustomDateRange();
    const { filter, setFilter } = useFilter();

    const start = startDate ? startDate.format("YYYY-MM-DD") : undefined;
    const end = endDate ? endDate.format("YYYY-MM-DD") : undefined;

    const handleAccept = (params) => {
        console.log('params: ', params);
        const { row } = params;
        console.log('row', row);

        dispatch(updateTaskStatus({ id: row.id, data: { status: "accepted" } }));
    };

    const handleReject = (params) => {
        console.log('params: ', params);

        const { row } = params;
        console.log('row', row);
        dispatch(updateTaskStatus({ id: row.id, data: { status: "rejected" } }));
    };

    useEffect(() => {
        dispatch(
            fetchTasks({
                params: { ...filter },
            })
        );
    }, [dispatch, filter]);

    useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            ...(start && { dueDate_gte: start }),
            ...(end && { dueDate_lte: end }),
        }));
    }, [setFilter, start, end]);

    console.log("Tasks:- ", items);

    const columns = [
        {
            field: "title",
            headerName: "Title",
            flex: 1,
            headerAlign: "center",
            align: "center",
            disableColumnMenu: true,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            headerAlign: "center",
            align: "center",
            disableColumnMenu: true,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            headerAlign: "center",
            align: "center",
            disableColumnMenu: true,
        },
        {
            field: "dueDate",
            headerName: "Due Date",
            flex: 1,
            headerAlign: "center",
            align: "center",
            disableColumnMenu: true,
        },
        {
            field: "actions",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                    }}
                >
                    <CustomButton
                        variant="outlined"
                        size="small" // use custom-class
                        onClick={() => handleAccept(params)}
                    >
                        <ICONS.Check /> Accept
                    </CustomButton>
                    <CustomButton
                        size="small" // use custom-class
                        onClick={() => handleReject(params)}
                    >
                        <ICONS.Clear /> Reject
                    </CustomButton>
                </Box>
            ),
        },
    ];

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <CustomTable rows={items} columns={columns} loading={loading} />
        </Box>
    );
};

export default Tasks;
