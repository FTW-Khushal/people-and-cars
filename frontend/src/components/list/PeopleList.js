import React from "react";
import { useQuery, gql } from "@apollo/client";
import { List, Card, Button } from "antd";
import PersonCard from "../card/PersonCard";
import PersonForm from "../form/PersonForm";

const GET_PEOPLE = gql`
  query GetPeople {
    people {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;

const PeopleList = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <PersonForm />
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={data.people}
        renderItem={(person) => (
          <List.Item>
            <PersonCard person={person} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default PeopleList;
