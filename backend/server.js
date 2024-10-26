const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// Sample data
let people = [
  { id: "1", firstName: "John", lastName: "Doe" },
  { id: "2", firstName: "Jane", lastName: "Smith" },
];
let cars = [
  {
    id: "1",
    year: 2020,
    make: "Toyota",
    model: "Camry",
    price: 24000,
    personId: "1",
  },
  {
    id: "2",
    year: 2018,
    make: "Honda",
    model: "Accord",
    price: 22000,
    personId: "2",
  },
];

// GraphQL schema
const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    cars: [Car]
  }

  type Car {
    id: ID!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
  }

  type Query {
    people: [Person]
    person(id: ID!): Person
    cars: [Car]
    car(id: ID!): Car
  }

  type Mutation {
    addPerson(firstName: String!, lastName: String!): Person
    updatePerson(id: ID!, firstName: String, lastName: String): Person
    deletePerson(id: ID!): Person

    addCar(
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: ID!
    ): Car
    updateCar(
      id: ID!
      year: Int
      make: String
      model: String
      price: Float
    ): Car
    deleteCar(id: ID!): Car
  }
`;

// Resolvers
const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => people.find((person) => person.id === id),
    cars: () => cars,
    car: (_, { id }) => cars.find((car) => car.id === id),
  },
  Mutation: {
    addPerson: (_, { firstName, lastName }) => {
      const newPerson = { id: String(people.length + 1), firstName, lastName };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (_, { id, firstName, lastName }) => {
      const person = people.find((person) => person.id === id);
      if (!person) return null;
      if (firstName) person.firstName = firstName;
      if (lastName) person.lastName = lastName;
      return person;
    },
    deletePerson: (_, { id }) => {
      const personIndex = people.findIndex((person) => person.id === id);
      if (personIndex === -1) return null;
      return people.splice(personIndex, 1)[0];
    },
    addCar: (_, { year, make, model, price, personId }) => {
      const newCar = {
        id: String(cars.length + 1),
        year,
        make,
        model,
        price,
        personId,
      };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (_, { id, year, make, model, price }) => {
      const car = cars.find((car) => car.id === id);
      if (!car) return null;
      if (year) car.year = year;
      if (make) car.make = make;
      if (model) car.model = model;
      if (price) car.price = price;
      return car;
    },
    deleteCar: (_, { id }) => {
      const carIndex = cars.findIndex((car) => car.id === id);
      if (carIndex === -1) return null;
      return cars.splice(carIndex, 1)[0];
    },
  },
  Person: {
    cars: (parent) => cars.filter((car) => car.personId === parent.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// Create Apollo Server
const main = async () => {
  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
  );
};

main();
