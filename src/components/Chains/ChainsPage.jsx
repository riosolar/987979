import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  AvaxLogo,
  PolygonLogo,
  PolygonLogoDisabled,
  BSCLogoDisabled,
  BSCLogo,
  ETHLogo,
} from "./Logos";
import { useChain, useMoralis } from "react-moralis";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "52px",
    fontWeight: "400",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    padding: "0 15px",
    background: "#1F233C",
    color: "white",
    marginTop: "15px",
    marginBottom: "15px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px",
    fontWeight: "400",
  },
};

const menuItems = [
  /*{
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />,
  },
  {
    key: "0x539",
    value: "Local Chain",
    icon: <ETHLogo />,
  },
  {
    key: "0x3",
    value: "Ropsten Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x4",
    value: "Rinkeby Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x2a",
    value: "Kovan Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x5",
    value: "Goerli Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet (live)",
    icon: <BSCLogo />,
  },*/
  {
    key: "0x38",
    value: "Binance Smart Chain",
    icon: <BSCLogo />,
  },
  /*
  {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
  },*/ ///
  {
    key: "",
    value: "Arbitrum Testnet (soon)",
    //icon: <PolygonLogoDisabled />,
  },
  {
    key: "",
    value: "Polygon Testnet (soon)",
    // icon: <PolygonLogoDisabled />,
  } /*
  {
    key: "",
    value: "Ethereum Testnet (soon)",
    //icon: <PolygonLogoDisabled />,
  },*/,
  /*{
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />,
  },
  {
    key: "0xa869",
    value: "Avalanche Testnet",
    icon: <AvaxLogo />,
  },*/
];

function ChainsPage() {
  const { switchNetwork, chainId, chain } = useChain();
  const { isAuthenticated } = useMoralis();
  const [selected, setSelected] = useState({});

  //console.log("chain", chain);

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
    //console.log("current chainId: ", chainId);
  }, [chainId]);

  const handleMenuClick = (e) => {
    console.log("switch to: ", e.key);
    switchNetwork(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
          <span style={{ marginLeft: "5px" }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  if (!chainId || !isAuthenticated) return null;

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          key={selected?.key}
          icon={selected?.icon}
          style={{ ...styles.button, ...styles.item }}
        >
          <span style={{ marginLeft: "5px" }}>{selected?.value}</span>
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default ChainsPage;
