import { useMutation } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { GET_PEOPLE, UPDATE_CAR } from "../../graphql/queries";

const UpdateCar = ({ carsOwned, onCancel, listOfPeople }) => {
  const [form] = Form.useForm();
  const { id, year, make, model, price, personId } = carsOwned;

  // console.log("checking personid: ", personId);
  const [, forceUpdate] = useState();
  const [updateCar] = useMutation(UPDATE_CAR);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    updateCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId,
      },

      update: (cache, { data: { updateCar } }) => {
        const peopleBeforeEdit = cache.readQuery({ query: GET_PEOPLE });

        // console.log("before edit: ", peopleBeforeEdit);

        // person id not changed
        const onlyCarDetailChanged = peopleBeforeEdit?.people.map((person) => {
          if (person.id === updateCar.personId) {
            return {
              ...person,
              carsOwned: person.carsOwned.map((car) => {
                if (car.id === updateCar.id) {
                  return UpdateCar;
                } else return car;
              }),
            };
          } else {
            return person;
          }
        });

        // console.log(
        //   "2.only car detail changed person not changed ",
        //   onlyCarDetailChanged
        // );

        // person id changed
        const personCarRemoved = peopleBeforeEdit?.people.map((person) => {
          if (person.id === carsOwned.personId) {
            return {
              ...person,
              carsOwned: person.carsOwned.filter(
                (car) => car.id !== updateCar.id
              ),
            };
          } else {
            return person;
          }
        });

        // console.log("older person id", personCarRemoved);

        const personCarAdded = personCarRemoved?.map((person) => {
          if (person.id === updateCar.personId) {
            return { ...person, carsOwned: [...person.carsOwned, updateCar] };
          } else {
            return person;
          }
        });

        // console.log("new person id", personCarAdded);

        const finalPeopleList =
          carsOwned.personId === updateCar.personId
            ? onlyCarDetailChanged
            : personCarAdded;

        cache.writeQuery({
          query: GET_PEOPLE,
          data: { people: finalPeopleList },
        });
      },
    });

    onCancel();
  };

  return (
    <Form
      name="update-car-form"
      layout="inline"
      size="default"
      form={form}
      initialValues={{ year, make, model, price, personId }}
      onFinish={onFinish}
      style={{ margin: "1rem 0" }}
    >
      <Form.Item
        name="year"
        label="Year"
        rules={[{ required: true, message: "Please enter year" }]}
      >
        <Input style={{ width: "6rem" }} type="number" placeholder="Year" />
      </Form.Item>

      <Form.Item
        name="make"
        label="Make"
        rules={[{ required: true, message: "Please enter make" }]}
      >
        <Input placeholder="Make" />
      </Form.Item>

      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please enter model" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <Input
          style={{ width: "6rem" }}
          type="number"
          prefix="$"
          placeholder="Price"
        />
      </Form.Item>

      <Form.Item name="personId" label="Person">
        <Select placeholder="Select a person">
          {listOfPeople.map((p) => (
            <Select.Option value={p.id} key={p.id}>
              {p.firstName} {p.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>

      <Button onClick={onCancel}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
