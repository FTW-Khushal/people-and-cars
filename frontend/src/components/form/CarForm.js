import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, InputNumber, Button } from "antd";

const ADD_CAR = gql`
  mutation AddCar(
    $year: Int!
    $make: String!
    $model: String!
    $price: Float!
    $personId: ID!
  ) {
    addCar(
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

const CarForm = ({ personId }) => {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");

  const [addCar] = useMutation(ADD_CAR, {
    update(cache, { data: { addCar } }) {
      cache.modify({
        fields: {
          cars(existingCars = []) {
            return [...existingCars, addCar];
          },
        },
      });
    },
    optimisticResponse: {
      addCar: {
        id: new Date().toISOString(),
        year,
        make,
        model,
        price,
        personId,
        __typename: "Car",
      },
    },
  });

  const handleSubmit = () => {
    addCar({
      variables: {
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId,
      },
    });
    setYear("");
    setMake("");
    setModel("");
    setPrice("");
  };

  return (
    <Form layout="inline" onFinish={handleSubmit}>
      <Form.Item>
        <InputNumber
          placeholder="Year"
          value={year}
          onChange={(value) => setYear(value)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <InputNumber
          placeholder="Price"
          value={price}
          onChange={(value) => setPrice(value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Car
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarForm;
