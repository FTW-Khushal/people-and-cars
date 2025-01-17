import find from "lodash.find";
import remove from "lodash.remove";

const people = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

const cars = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura ",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    personId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    personId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    personId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    personId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    personId: "3",
  },
];

const typeDefs = `
    type Person {
        id: String!
        firstName: String
        lastName: String
        carsOwned: [Car]
    }
        
    type Car {
        id: String!
        year: Int
        make: String
        model: String
        price: Float
        personId: String!
    }

    type Query {
      person(id: String!): Person
      people: [Person]
      car(id: String!): Car
      cars: [Car]
    }

    type Mutation {
      addPerson(id: String!, firstName: String!, lastName: String!): Person
      updatePerson(id: String!, firstName: String!, lastName: String!): Person
      removePerson(id: String!): Person
      
      addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
      updateCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
      removeCar(id: String!): Car
    }
`;

const resolvers = {
  Query: {
    people: () => people,
    person(root, args) {
      return find(people, { id: args.id });
    },
    cars: () => cars,
    car(root, args) {
      return find(cars, { id: args.id });
    },
  },
  Person: {
    carsOwned: (person) => {
      return cars.filter((car) => car.personId === person.id);
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };

      people.push(newPerson);
      return newPerson;
    },

    updatePerson: (root, args) => {
      const updatePerson = find(people, { id: args.id });

      if (!updatePerson) {
        throw new Error(`Couldn\'t find person with id ${args.id}`);
      } else {
        updatePerson.firstName = args.firstName;
        updatePerson.lastName = args.lastName;

        return updatePerson;
      }
    },

    removePerson: (root, args) => {
      const removePerson = find(people, { id: args.id });
      if (!removePerson) {
        throw new Error(`Couldn\'t find person with id ${args.id}`);
      } else {
        remove(people, (person) => {
          return person.id === removePerson.id;
        });

        remove(cars, (car) => {
          return car.personId === removePerson.id;
        });

        return removePerson;
      }
    },

    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };

      const checkPersonId = find(people, { id: args.personId });

      if (!checkPersonId) {
        throw new Error(`Couldn\'t find person with id ${args.personId}`);
      } else {
        cars.push(newCar);
        return newCar;
      }
    },

    updateCar: (root, args) => {
      const updateCar = find(cars, { id: args.id });

      if (!updateCar) {
        throw new Error(`Couldn\'t find car with id ${args.id}`);
      } else {
        updateCar.year = args.year;
        updateCar.make = args.make;
        updateCar.model = args.model;
        updateCar.price = args.price;
        updateCar.personId = args.personId;

        return updateCar;
      }
    },

    removeCar: (root, args) => {
      const removeCar = find(cars, { id: args.id });
      if (!removeCar) {
        throw new Error(`Couldn\'t find car with id ${args.id}`);
      } else {
        remove(cars, (car) => {
          return car.id === removeCar.id;
        });

        return removeCar;
      }
    },
  },
};

export { typeDefs, resolvers };