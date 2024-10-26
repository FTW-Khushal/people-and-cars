import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_PEOPLE, REMOVE_CAR } from "../../graphql/queries";

const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });

      const updatedPeopleCar = people.map((person) => {
        if (
          person.carsOwned.filter((car) => car.id === removeCar.id).length > 0
        ) {
          return {
            ...person,
            carsOwned: person.carsOwned.filter((car) => car.id !== id),
          };
        } else {
          return person;
        }
      });

      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: updatedPeopleCar,
        },
      });
    },
  });

  const handleDeleteButton = () => {
    let confirmDeletion = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (confirmDeletion) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleDeleteButton}
    />
  );
};

export default RemoveCar;
