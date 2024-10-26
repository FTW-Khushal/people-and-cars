import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from "antd";

const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastName: String!) {
    addPerson(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

const PersonForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [addPerson] = useMutation(ADD_PERSON, {
    update(cache, { data: { addPerson } }) {
      cache.modify({
        fields: {
          people(existingPeople = []) {
            return [...existingPeople, addPerson];
          },
        },
      });
    },
    optimisticResponse: {
      addPerson: {
        id: new Date().toISOString(),
        firstName,
        lastName,
        __typename: "Person",
      },
    },
  });

  const handleSubmit = () => {
    addPerson({ variables: { firstName, lastName } });
    setFirstName("");
    setLastName("");
  };

  return (
    <Form layout="inline" onFinish={handleSubmit}>
      <Form.Item>
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Person
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonForm;
