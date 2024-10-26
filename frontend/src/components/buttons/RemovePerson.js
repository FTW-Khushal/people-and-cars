import { useMutation } from "@apollo/client";
import { GET_PEOPLE, REMOVE_PERSON } from "../../graphql/queries";
import { DeleteOutlined } from "@ant-design/icons";

const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });

      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: people.filter((person) => person.id !== removePerson.id),
        },
      });
    },
  });

  const handleDeleteButton = () => {
    let confirmDeletion = window.confirm(
      "Are you sure you want to delete this person?"
    );

    if (confirmDeletion) {
      removePerson({
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

export default RemovePerson;
