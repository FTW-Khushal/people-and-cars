import React from "react";
import { Card, Button } from "antd";
import CarCard from "./CarCard";
import CarForm from "../form/CarForm";

const PersonCard = ({ person }) => {
  return (
    <Card title={`${person.firstName} ${person.lastName}`}>
      <p>Cars:</p>
      {person.cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
      <CarForm personId={person.id} />
      <Button>Edit Person</Button>
      <Button danger>Delete Person</Button>
    </Card>
  );
};

export default PersonCard;
