import { TurnedInNot } from "@mui/icons-material";
import { Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { SideBarItem } from "./";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate('/user/user-info');
    };

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant="h6" noWrap component='div' sx={{ flexGrow: 1 }}>
                        {displayName}
                    </Typography>
                    <SettingsIcon 
                        onClick={handleSettingsClick} 
                        sx={{ cursor: 'pointer' }} 
                    />
                </Toolbar>

                <Divider />

                <List>
                    {
                        notes.map(note => (
                            <SideBarItem key={note.id} {...note} />
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    );
};
