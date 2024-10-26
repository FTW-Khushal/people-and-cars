import React from "react";
import { Card, Button } from "antd";
import { useMutation, gql } from "@apollo/client";

const DELETE_CAR = gql`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id) {
      id
    }
  }
`;

const CarCard = ({ car }) => {
  const [deleteCar] = useMutation(DELETE_CAR, {
    update(cache, { data: { deleteCar } }) {
      cache.modify({
        fields: {
          cars(existingCars = []) {
            return existingCars.filter(
              (c) => c.__ref !== `Car:${deleteCar.id}`
            );
          },
        },
      });
    },
    optimisticResponse: {
      deleteCar: {
        id: car.id,
        __typename: "Car",
      },
    },
  });

  return (
    <Card>
      <p>
        {car.year} {car.make} {car.model} - ${car.price}
      </p>
      <Button danger onClick={() => deleteCar({ variables: { id: car.id } })}>
        Delete Car
      </Button>
    </Card>
  );
};

export default CarCard;
