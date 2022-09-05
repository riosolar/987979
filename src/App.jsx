import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LogoHeader from "components/LogoHeader";

import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";

import TOKENPresale from "components/TOKENPresale";
import { Layout, Tabs } from "antd";
import "antd/dist/antd.css";
import "./style.css";

import Text from "antd/lib/typography/Text";
import MenuItems from "./components/MenuItems";

const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "white",
    paddingTop: "150px",
    paddingBottom: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
    background:
      "linear-gradient(222deg, rgba(34,38,65,1) 0%, rgba(19,21,36,1) 21%, rgba(30,33,56,1) 64%, rgba(19,21,36,1) 100%)",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#131525",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "20px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            <TokenPrice
              address="0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
              chain="bsc"
              image="https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615"
              size="25px"
            />
            {/* <NativeBalance /> */}
            <Chains />
            {/*  <Account />*/}
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route path="/presale">
              <TOKENPresale />
            </Route>
            <Route path="/">
              <Redirect to="/presale" />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer
        style={{
          boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
          textAlign: "center",
          fontSize: "17px",
          fontWeight: "500",
          backgroundColor: "#131525",
          color: "white",
        }}
      ></Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={styles.LogoHeader}>
    <LogoHeader image="https://storageapi2.fleek.co/65baa672-f449-45c2-ab44-13cf8312b581-bucket/logo1.png" />
  </div>
);

export default App;
