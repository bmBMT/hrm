import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeIcon from '@mui/icons-material/Badge';
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupportIcon from "@mui/icons-material/Support";
import { useState, forwardRef, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "../../assets/Styles";
import StateContext from "../../context/StateContext";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const Link = forwardRef(function Link(itemProps, ref) {
  return (
    <RouterLink
      style={{ color: colors.darkGrey }}
      ref={ref}
      {...itemProps}
      role={undefined}
    />
  );
});

function CustomizedListItem(props) {
  const { primary, index, to, menuItem, selected, handleListItemClick, style } = props;
  return (
    <ListItem
      sx={{...{ width: "200px" }, ...style}}
      component={Link}
      to={to}
      key={index}
      disablePadding
    >
      <ListItemButton
        sx={{ paddingLeft: 0, borderRadius: "4px" }}
        disableRipple
        selected={selected}
        onClick={(evt) => handleListItemClick(evt, index, menuItem)}
      >
        <ListItemIcon sx={{ justifyContent: "center" }}>
          {index === 0 && <HomeOutlinedIcon />}
          {index === 1 && <PersonOutlineIcon />}
          {index === 2 && <PeopleOutlineIcon />}
          {index === 3 && <AccessTimeIcon />}
          {index === 4 && <ChatBubbleOutlineIcon />}
          {index === 5 && <PieChartOutlineOutlinedIcon />}
          {index === 6 && <SettingsOutlinedIcon />}
          {index === 7 && <SupportIcon />}
          {index === 8 && <BadgeIcon />}
          {index === 9 && <DocumentScannerIcon />}
        </ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  );
}

const items = [
  { name: "Главная", menuItem: "home" },
  { name: "Профиль", menuItem: "myinfo" },
  { name: "Сотрудники", menuItem: "people" },
  { name: "Выходные", menuItem: "timeoff" },
 // { name: "Reporting", menuItem: "reporting" },
];

/**
 * Side menu component for most pages. Contains buttons and links to multiple pages.
 *
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function SideMenu({ style, onSelect }) {
  const stateContext = useContext(StateContext);
  const user = useContext(StateContext).state.user;
  const isAdmin = user && user.permission.id === 1;
  const isManager = user && user.permission.id === 2;
    
    const [selectedIndex, setSelectedIndex] = useState(isAdmin ? 0 : 2);

  const handleListItemClick = (evt, index, menuItem) => {
    setSelectedIndex(index);
    if(onSelect){
      onSelect(menuItem);
    }
  };

  return (
    <Stack
      sx={{
        ...{
          //width: "10%",
          minWidth: "264px",
          height: "100%",
          minHeight: "100vh",
          //paddingRight: "15px",
          direction: "column",
          justifyContent: "space-between",
          borderRight: "1px solid #EBEBEB",
          borderBottom: "1px solid #EBEBEB",
          backgroundColor: "#FFFFFF",
          position: "fixed",
          zIndex: 2,
        },
        ...style,
      }}
    >
      <Box sx={{
        paddingLeft: "32px",
        paddingRight: "32px"
      }}>
        <img
          src={'/logo.jpg'}
          alt="Company Logo"
          style={{
            maxWidth: "200px",
            //height: "40px",
            marginTop: "40px",
            marginBottom: "24px"
          }}
        />
        <List>
          {items.map((item, index) => {
            return (
              <CustomizedListItem
                primary={item.name}
                index={index}
                menuItem={item.menuItem}
                selected={index === selectedIndex}
                handleListItemClick={handleListItemClick}
              />
            );
          })}
            {(isAdmin || isManager) && (
            <>
              <CustomizedListItem
                primary={"Опросы"}
                index={4}
                menuItem={"surveys"}
                selected={selectedIndex === 4}
                handleListItemClick={handleListItemClick}
              />
              <CustomizedListItem
                primary={"Отчетность"}
                index={5}
                menuItem={"reporting"}
                selected={selectedIndex === 5}
                handleListItemClick={handleListItemClick}
              />
              <CustomizedListItem
                primary={"Запросы"}
                index={8}
                menuItem={"requests"}
                selected={selectedIndex === 8}
                handleListItemClick={handleListItemClick}
              />
              <CustomizedListItem
                primary={"Эл. документы"}
                index={9}
                menuItem={"documents"}
                selected={selectedIndex === 9}
                handleListItemClick={handleListItemClick}
              />
            </>
          )}
          {isAdmin && (
            <CustomizedListItem
              primary={"Настройки"}
              index={6}
              menuItem={"settings"}
              selected={selectedIndex === 6}
              handleListItemClick={handleListItemClick}
            />
          )}
        </List>
      </Box>
    </Stack>
  );
}

//Control panel settings for storybook
SideMenu.propTypes = {};

//Default values for this component
SideMenu.defaultProps = {
  style: {},
};
