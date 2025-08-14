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

const drawerWidth = 180;

const HomePage = () => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => dispatch(logout());

    // Admin Sidebar
    const AdminSidebar = () => (
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
            <Toolbar />
            <List>
                {navItems.map(({ id, label, icon: Icon }) => (
                    <ListItem key={id} disablePadding>
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
    );

    // AppBar
    const AppHeader = ({ username }) => (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6">
                    {username ? `Welcome, ${username}` : "Taskmaster"}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    {currentUser ? (
                        <CustomButton onClick={handleLogout}>Logout</CustomButton>
                    ) : (
                        <>
                            <CustomButton onClick={() => navigate(URLS.LOGIN)}>Login</CustomButton>
                            <CustomButton onClick={() => navigate(URLS.REGISTER)}>Register</CustomButton>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );

    // Guest layout
    if (!currentUser) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppHeader />
            </Box>
        );
    }

    // Admin Layout
    if (currentUser.role === "admin") {
        return (
            <Box sx={{ display: "flex" }}>
                <AppHeader username={currentUser.name} />
                <AdminSidebar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        // ml: { sm: `${drawerWidth / 8}px`, md: `${drawerWidth / 4}px`, lg: `${drawerWidth / 2}px` },
                    }}

                >
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        );
    }

    // User Layout
    if (currentUser.role === "user") {
        return (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <AppHeader username={currentUser.name} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <UserDashboard />
                </Box>
            </Box>
        );
    }

    return null; // fallback if role is unknown
};

export default HomePage;
