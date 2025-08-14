import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import CustomTable from "../shared/CustomTable/index";
import CustomButton from "../shared/CustomButton/index";
import { useEffect, useState } from "react";
import { fetchTasks } from "../redux/slices/task.slices";
import CustomSelect from "../shared/CustomSelect";
import CustomSearch from "../shared/CustomSearch/index";
import DateRangePicker from "./DateRangePicker";
import useCustomDateRange from "../hooks/useCustomDateRange";
import useSearch from "../hooks/useSearch";
import usePage from "../hooks/usePage";
import useSortFilter from "../hooks/useSortFilter";
import useLimit from "../hooks/useLimit";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { URLS } from "../utils/urls";

const UserDashboard = () => {
    const { currentUser, total } = useSelector((state) => state.users);
    const { items, loading, error } = useSelector((state) => state.tasks);
    console.log("currentUser: ", currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [filter, setFilter] = useState({ userId: currentUser.userId });
    const { startDate, endDate, setStartDate, setEndDate } = useCustomDateRange();
    const { query, setQuery } = useSearch();
    const { page, setPage } = usePage();
    const { sort, setSort } = useSortFilter();
    const { limit, limitOptions, setLimit } = useLimit();
    const debouncedValue = useDebounce(query, 200);
    const start = startDate ? startDate.format("YYYY-MM-DD") : undefined;
    const end = endDate ? endDate.format("YYYY-MM-DD") : undefined;

    useEffect(() => {
        dispatch(
            fetchTasks({
                params: {
                    ...filter,
                },
            })
        );
    }, [dispatch, filter]);

    useEffect(() => {
        console.log("limit updated:", limit);
        console.log("query updated:", query);
    }, [limit, query]);

    useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            _limit: limit,
            _page: page + 1,
            q: debouncedValue,
            ...(start && { dueDate_gte: start }),
            ...(end && { dueDate_lte: end }),
        }));
    }, [setFilter, start, end, limit, debouncedValue, page]);

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
            renderCell: () => (
                <Box>
                    <CustomButton>Edit</CustomButton>
                </Box>
            ),
        },
    ];

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;
    }

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography>My Tasks</Typography>
                <CustomButton onClick={() => navigate(URLS.CREATE)}>New Task</CustomButton>
            </Box>
            <Box>
                <CustomSelect
                    sx={{ width: 75 }}
                    limit={limit}
                    setLimit={setLimit}
                    limitOptions={limitOptions}
                />
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
                <CustomSearch
                    sx={{ width: 250 }}
                    placeholder="Search..."
                    query={query}
                    setQuery={setQuery}
                />
            </Box>
            <CustomTable
                columns={columns}
                rows={items}
                loading={loading}
                limit={limit}
                limitOptions={limitOptions}
                page={page}
                rowCount={total}
                setLimit={setLimit}
                setPage={setPage}
                setSort={setSort}
                sort={sort}
            />
        </Box>
    );
};

export default UserDashboard;
