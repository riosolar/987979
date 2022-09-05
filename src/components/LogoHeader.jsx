const styles = {
  LogoHeader: {
    padding: "0px",
    width: "130px",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
    marginLeft: "0px",
  },
};
function LogoHeader(props) {
  return (
    <div style={styles.LogoHeader}>
      <img src={props.image} alt="logo" />
    </div>
  );
}
export default LogoHeader;
