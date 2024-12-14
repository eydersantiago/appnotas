import { TurnedInNot } from "@mui/icons-material"
import { Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import { SideBarItem } from "./"
import { use , useEffect} from "react"

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);

    useEffect(() => {
        if (notes === undefined) {
            //window.location.href = 'https://tarampampam.github.io/error-pages/hacker-terminal/500.html';
            console.log(notes)
            window.location.href = 'http://localhost:8080/410.html';
        }
    }, [notes]);


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
                    <Typography variant="h6" noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>

                <Divider />

                <List>
                    {
                        Array.isArray(notes) && notes.length > 0 && (
                            notes.map(note => (
                                <SideBarItem key={note.id} {...note} />
                            ))
                        )
                    }
                </List>

            </Drawer>
        </Box>
    )
}
