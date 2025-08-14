//  Clipped drawer

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    useTheme,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import { navItems } from "../utils/helper";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../shared/CustomButton";
import { logout } from "../redux/slices/user.slices";
import UserDashboard from "./UserDashboard";
import { URLS } from "../utils/urls";

const drawerWidth = 200;

const NewNavbar = () => {
    const theme = useTheme();
    const { pathname } = useLocation();

    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("NewNavbar Current User:- ", currentUser);

    return (
        <>
            {currentUser ? (
                <Box sx={{ display: "flex" }}>
                    {/* Navbar */}
                    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>Welcome, {currentUser.name}</Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <CustomButton onClick={() => dispatch(logout())}>
                                    Logout
                                </CustomButton>
                            </Box>
                        </Toolbar>
                    </AppBar>

                    {currentUser.role === "admin" && (
                        <>
                            {/* Sidebar Drawer */}
                            <Drawer
                                variant="permanent"
                                sx={{
                                    width: drawerWidth,
                                    [`& .MuiDrawer-paper`]: {
                                        width: drawerWidth,
                                        boxSizing: "border-box",
                                    },
                                }}
                            >
                                <Toolbar /> {/*  spacer so list starts below AppBar */}
                                <List>
                                    {navItems.map(({ id, label, icon: Icon }, index) => (
                                        <ListItem key={index} disablePadding>
                                            <ListItemButton
                                                component={Link}
                                                to={`/${id}`}
                                                selected={pathname === `/${id}`}
                                            >
                                                {Icon && (
                                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                                        <Icon />
                                                    </ListItemIcon>
                                                )}
                                                <ListItemText primary={label} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Drawer>

                            {/* Main Content Placeholder */}
                            <Box
                                component="main"
                                sx={{ flexGrow: 1, p: 3, ml: { sm: `${drawerWidth}px` } }}
                            >
                                <Toolbar /> {/* pushes below AppBar */}
                                <Outlet /> {/* ← child routes render here */}
                            </Box>
                        </>
                    )}

                    {currentUser.role === "user" && (
                        <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
                            <Toolbar />
                            <UserDashboard /> {/* Direct render for user */}
                        </Box>
                    )}
                </Box>
            ) : (
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>Taskmaster</Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <CustomButton onClick={() => navigate(URLS.LOGIN)}>
                                    Login
                                </CustomButton>
                                <CustomButton onClick={() => navigate(URLS.REGISTER)}>
                                    Register
                                </CustomButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
            )}
        </>
    );
};

export default NewNavbar;
