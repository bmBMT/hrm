import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const listContent = <List>
    <ListItem sx={{width: 300}} disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Главная" />
        </ListItemButton>
    </ListItem>
    <ListItem sx={{width: 300}} disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Люди" />
        </ListItemButton>
    </ListItem>
    <ListItem sx={{width: 300}} disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Выходные" />
        </ListItemButton>
    </ListItem>
    <ListItem sx={{width: 300}} disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <BusinessOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Компания" />
        </ListItemButton>
    </ListItem>
    <ListItem sx={{width: 300}} disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <PieChartOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Отчетность" />
        </ListItemButton>
    </ListItem>
    <ListItem sx={{width: 300}} disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
        </ListItemButton>
    </ListItem>
</List>;

//Storybook display settings
export default { 
    title: 'BasicMenus/BasicMenu',
    component: Box,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each BasicMenu type
export const Primary = {
    args: {
        sx: { 
            width: '100%', 
            maxWidth: 360 
        },
        children: listContent
    }
};