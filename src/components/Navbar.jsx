// Persistent Drawer

import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Box,
    useTheme,
    Drawer,
    styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { navItems } from "../utils/helper";
import Users from "./Users";
import Tasks from "./Tasks";

const Navbar = () => {
    const theme = useTheme();

    const [openDrawer, setOpenDrawer] = useState(false);
    const [activeItem, setActiveItem] = useState(navItems[0].id);

    const handleOpenDrawer = () => setOpenDrawer(true);
    const handleCloseDrawer = () => setOpenDrawer(false);

    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        justifyContent: "flex-end",
    }));

    const componentsMap = {
        users: <Users />,
        tasks: <Tasks />,
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        onClick={handleOpenDrawer}
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        {navItems.map((item, index) => (
                            <Button key={index} color="inherit">
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={openDrawer} onClose={handleCloseDrawer}>
                <DrawerHeader>
                    <IconButton onClick={handleCloseDrawer}>
                        {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </DrawerHeader>
                <Box
                    sx={{
                        width: 250,
                        padding: 2,
                        backgroundColor: theme.palette.primary.main,
                    }}
                    role="presentation"
                    onClick={handleOpenDrawer}
                    onKeyDown={handleOpenDrawer}
                >
                    {navItems.map((item, index) => (
                        <Button
                            key={index}
                            fullWidth
                            color="inherit"
                            sx={{
                                justifyContent: "flex-start",
                                textTransform: "none",
                                gap: 1,
                            }}
                            onClick={() => setActiveItem(item.id)}
                            variant={activeItem === item.id ? "outlined" : "text"}
                            startIcon={item.icon ? <item.icon /> : null}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>
            </Drawer>
            <Box>{componentsMap[activeItem] || <div>Select an item</div>}</Box>
        </>
    );
};

export default Navbar;
