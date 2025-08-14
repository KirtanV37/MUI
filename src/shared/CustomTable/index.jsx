import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";

const CustomTable = ({
    height = 500,
    rows = [],
    columns = [],
    loading,
    rowCount,
    limitOptions,
    page,
    limit,
    setPage,
    setLimit,
    setSort,
    ...props
}) => {
    console.log("📊 DataGrid Props", {
        rows,
        columns,
        rowCount,
        page,
        limit,
        limitOptions,
    });
    return (
        <Box sx={{ height, width: "100%" }}>
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : rows.length === 0 ? (
                <Typography textAlign="center" mt={4}>
                    No records found.
                </Typography>
            ) : (
                <DataGrid
                    rows={rows}
                    loading={loading}
                    columns={columns}
                    pagination
                    paginationMode="server"
                    pageSizeOptions={limitOptions}
                    rowCount={rowCount}
                    paginationModel={{
                        page: page,
                        pageSize: limit,
                    }}
                    onPaginationModelChange={(model) => {
                        setPage?.(model.page);
                        setLimit?.(model.pageSize);
                    }}
                    sortingMode="server"
                    filterMode="server"
                    onSortModelChange={(sortModel) => {
                        if (sortModel.length > 0) {
                            const { field, sort } = sortModel[0];
                            setSort?.({ field, order: sort });
                        } else {
                            setSort?.({ field: "", order: "" });
                        }
                    }}
                    {...props}
                />
            )}
        </Box>
    );
};

export default CustomTable;
