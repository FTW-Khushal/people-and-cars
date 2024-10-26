import { Typography } from "antd";

const FormTitle = ({ formTitle }) => {
  const { Title } = Typography;
  return (
    <Title
      level={2}
      style={{
        textAlign: "center",
        fontSize: 20,
        marginBottom: "1rem",
      }}
    >
      {formTitle}
    </Title>
  );
};

export default FormTitle;
