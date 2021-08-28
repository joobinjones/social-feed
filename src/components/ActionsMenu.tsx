import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
const ActionsMenu = ({
  editCall,
  deleteCall,
}: {
  editCall: Function;
  deleteCall: Function;
}): JSX.Element => {
  return (
    <Menu>
      <MenuButton style={{ borderRadius: "7px", border: "transparent" }} as={Button}>
        <GiHamburgerMenu />
      </MenuButton>
      <MenuList>
        <MenuItem
          as={Button}
          borderColor="transparent"
          color="grey"
          onClick={() => editCall()}
        >
          Edit
        </MenuItem>
        <MenuItem
          borderColor="transparent"
          color="grey"
          onClick={() => deleteCall()}
          as={Button}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ActionsMenu;
