import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../graphql/queries";
import { Card } from "antd";

const ShowDetailPage = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id },
  });

  if (loading) return "loading...";
  if (error) return `Error: ${error.message}`;
  //   console.log("show page: ", data.person);
  const personDetail = data.person;

  const formatPriceCurrency = (price) => {
    const currency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return currency.format(price);
  };

  const styles = getStyles();

  return (
    <div style={styles.cardWidth}>
      <Card style={styles.cardStyle}>
        <h2 style={styles.cardTitle}>
          {personDetail.firstName} {personDetail.lastName}
        </h2>
        {personDetail.carsOwned.length > 0 ? (
          personDetail.carsOwned.map((car) => (
            <Card style={styles.cardStyle} key={car.id}>
              <div style={styles.innerCardStyle}>
                <p style={styles.cardWidth}>
                  <span style={styles.pStyle}>Year: </span>
                  {car.year}
                </p>
                <p style={styles.cardWidth}>
                  <span style={styles.pStyle}>Make: </span>
                  {car.make}
                </p>
                <p style={styles.cardWidth}>
                  <span style={styles.pStyle}>Model: </span>
                  {car.model}
                </p>
                <p style={styles.cardWidth}>
                  <span style={styles.pStyle}>Price: </span>
                  {formatPriceCurrency(car.price)}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <div style={styles.cardTitle}>
            <p style={styles.pStyle}>No cars available</p>
          </div>
        )}
      </Card>
      <Link to={"/"} style={styles.linkStyle}>
        Go Back Home
      </Link>
    </div>
  );
};

const getStyles = () => ({
  cardWidth: { width: "100%" },
  pStyle: {
    fontWeight: "bold",
  },
  cardTitle: { textAlign: "center" },
  cardStyle: {
    margin: "2rem 0",
    boxShadow: "0 4px 8px rgba(0, 0, 255, 0.1)",
  },
  innerCardStyle: { display: "flex", flex: 1 },
  linkStyle: { textTransform: "uppercase" },
});

export default ShowDetailPage;
