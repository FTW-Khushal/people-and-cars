import { Button, Card, Form, Input } from "antd";
import { UPDATE_PERSON } from "../../graphql/queries";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

const UpdatePerson = (props) => {
  const { id, firstName, lastName, onCancel, carList } = props;
  const [form] = Form.useForm();

  const [, forceUpdate] = useState();
  const [updatePerson] = useMutation(UPDATE_PERSON);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });

    onCancel();
  };

  return (
    <Card
      title={`${firstName} ${lastName}`}
      style={{ margin: "1rem 0" }}
      //   actions={[<EditOutlined key="edit" onClick={onCancel} />]}
    >
      <Form
        name="update-person-form"
        layout="inline"
        size="default"
        form={form}
        onFinish={onFinish}
        style={{ margin: "1rem 0" }}
        initialValues={{ firstName, lastName }}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please enter first Name" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Update Person
            </Button>
          )}
        </Form.Item>

        <Button onClick={onCancel}>Cancel</Button>
      </Form>
      <>{carList}</>
    </Card>
  );
};

export default UpdatePerson;
