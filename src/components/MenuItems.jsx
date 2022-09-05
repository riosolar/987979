import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

const styles = {
  menuText: {
    color: "white",
  },
};
function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        backgroundColor: "#131525",
        fontFamily: "verdana",
        display: "flex",
        fontSize: "12.5px",
        width: "100%",
        justifyContent: "center",
        borderBottom: "0px",
        color: "white",
      }}
      defaultSelectedKeys={[pathname]}
    >
      {/*
      <Menu.Item key="/presale">
        <NavLink style={styles.menuText} to="/nftbalance">
          Presale DEMO
    </NavLink>*/}
    </Menu>
  );
}

export default MenuItems;
