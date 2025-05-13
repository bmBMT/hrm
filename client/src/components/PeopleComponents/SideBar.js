import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PropTypes from "prop-types";

function CustomListItem(props) {
  const { icon, primary } = props;
  return (
    <ListItem>
      <ListItemButton>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  );
}

CustomListItem.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
};

/*

*/
export default function SideSidebar() {
  return (
    <Box
      component="section"
      sx={{
        p: 2,
        borderStyle: "solid",
        borderWidth: "0px 1px 0px 0px",
        borderColor: "#EBEBEB",
        width: 280,
        height: 1288,
      }}
    >
      <nav aria-label="navigation menu">
        <List>
          <CustomListItem primary="Home" icon={<OtherHousesOutlinedIcon />} />
          <CustomListItem
            primary="Люди"
            icon={<PeopleOutlineOutlinedIcon />}
          />
          <CustomListItem
            primary="Выходные"
            icon={<WatchLaterOutlinedIcon />}
          />
          <CustomListItem primary="Компания" icon={<BusinessOutlinedIcon />} />
          <CustomListItem
            primary="Отчетность"
            icon={<AssessmentOutlinedIcon />}
          />
          <CustomListItem primary="Настройки" icon={<SettingsOutlinedIcon />} />
        </List>
      </nav>
    </Box>
  );
}
