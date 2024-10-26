const Title = () => {
  const styles = titleStyle();
  return <h1 style={styles.title}>People and their cars</h1>;
};

const titleStyle = () => ({
  title: {
    textTransform: "uppercase",
    borderBottomColor: "lightgray",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    paddingBottom: "2rem",
  },
});

export default Title;
