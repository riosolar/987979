import { useMoralis, useNativeBalance } from "react-moralis";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);
  const { account, isAuthenticated } = useMoralis();

  if (!account || !isAuthenticated) return null;

  return (
    <div
      style={{
        textAlign: "center",
        whiteSpace: "nowrap",
        fontSize: "17px",
        fontWeight: "500",
        textAlign: "center",
        color: "orange",
      }}
    >
      Your BNB Balance : {balance.formatted}
    </div>
  );
}

export default NativeBalance;
