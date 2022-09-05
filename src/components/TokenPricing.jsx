import { useState } from "react";
import { useTokenPrice } from "react-moralis";

const styles = {
  token: {
    padding: "0 7px",
    height: "35px",
    gap: "5px",
    fontSize: "12px",
    fontWeight: "400",
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
    zIndex: "1000",
    marginLeft: "15px",
    marginRight: "15px",
    color: "#93949C",
  },
};
function TokenPricing(props) {
  const { data: formattedData } = useTokenPrice(props);

  const [isUSDMode, setIsUSDMode] = useState(true);

  const toggleDisplayStyle = () => setIsUSDMode(!isUSDMode);

  const noLogoToken = "https://etherscan.io/images/main/empty-token.png";

  return (
    <div style={styles.token}>
      <img
        src={props.image || noLogoToken}
        alt="logo"
        style={{ height: props?.size || "35px" }}
      />
      <span
        style={{ cursor: "pointer" }}
        onClick={toggleDisplayStyle}
        title={`Show in ${isUSDMode ? "ETH" : "USD"}`}
      >
        {formattedData &&
          (isUSDMode
            ? formattedData.formattedUsd
            : formattedData.formattedNative)}
      </span>
    </div>
  );
}
export default TokenPricing;
