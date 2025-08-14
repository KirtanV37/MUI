import { useEffect } from "react";
import CustomTable from "../shared/CustomTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/slices/user.slices";
import useFilter from "../hooks/useFilter";
import CustomSelect from "../shared/CustomSelect";
import useLimit from "../hooks/useLimit";
import { Box } from "@mui/material";
import CustomSearch from "../shared/CustomSearch";
import useSearch from "../hooks/useSearch";
import useDebounce from "../hooks/useDebounce";
import usePage from "../hooks/usePage";
import useSortFilter from "../hooks/useSortFilter";

const Users = () => {
    const { items, loading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { filter, setFilter } = useFilter();
    const { limit, setLimit, limitOptions } = useLimit();
    const { query, setQuery } = useSearch();
    const { page, setPage } = usePage();
    const debouncedValue = useDebounce(query, 200);
    const { total } = useSelector((state) => state.users);
    const { sort, setSort } = useSortFilter();

    const sortValue = sort.field ? sort.field : undefined;
    const orderValue = sort.order ? sort.order : undefined;

    useEffect(() => {
        dispatch(fetchUsers({ params: { ...filter } }));
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
            ...(sortValue && { _sort: sortValue }),
            ...(orderValue && { _order: orderValue }),
        }));
    }, [limit, debouncedValue, sortValue, orderValue, page, setFilter]);

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            headerAlign: "center", // Center the Column-Cell
            align: "center", // Center the Row-cell
            disableColumnMenu: true,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            headerAlign: "center",
            align: "center",
            disableColumnMenu: true,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
    ];

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <CustomSelect
                    sx={{ width: 75 }}
                    limit={limit}
                    setLimit={setLimit}
                    limitOptions={limitOptions}
                />
                <CustomSearch
                    sx={{ width: 250 }}
                    placeholder="Search..."
                    query={query}
                    setQuery={setQuery}
                />
            </Box>
            <CustomTable
                rows={items}
                columns={columns}
                loading={loading}
                limitOptions={limitOptions}
                rowCount={total}
                page={page}
                limit={limit}
                setPage={setPage}
                setLimit={setLimit}
                sort={sort}
                setSort={setSort}
            />
        </Box>
    );
};

export default Users;
