import { useQuery } from "@apollo/client";
import AddCar from "../components/forms/AddCar";
import AddPerson from "../components/forms/AddPerson";
import PeopleCarsDetail from "../components/lists/PeopleCarsDetail";
import Title from "../components/layout/Title";
import { GET_PEOPLE } from "../graphql/queries";

const PeopleCar = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  return (
    <div>
      <Title />
      <AddPerson />
      <AddCar listOfPeople={data} />
      <PeopleCarsDetail />
    </div>
  );
};

export default PeopleCar;
