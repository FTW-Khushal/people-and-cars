import { Card } from "antd";
import CarCard from "./CarCard";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";
import { Link } from "react-router-dom";

const PersonCard = (props) => {
  const { id, firstName, lastName, carsOwned, listOfPeople } = props;
  // console.log("person card car: ", listOfPeople);

  const [editMode, setEditmode] = useState(false);

  const handleEditButton = () => {
    setEditmode(!editMode);
  };

  const carList =
    carsOwned.length > 0 ? (
      carsOwned.map((car) => (
        <CarCard
          id={car.id}
          year={car.year}
          make={car.make}
          model={car.model}
          price={car.price}
          personId={car.personId}
          key={car.id}
          listOfPeople={listOfPeople}
        />
      ))
    ) : (
      <></>
    );

  return (
    <>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onCancel={handleEditButton}
          carList={carList}
        />
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          style={{ margin: "1rem 0" }}
          actions={[
            <EditOutlined key="edit" onClick={handleEditButton} />,
            <RemovePerson id={id} />,
          ]}
        >
          {carList}
          <Link to={`/people/${id}`}>Learn More</Link>
        </Card>
      )}
    </>
  );
};

export default PersonCard;
