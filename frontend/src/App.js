import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import PeopleCar from "./routes/PeopleCar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShowDetailPage from "./routes/ShowDetailPage";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <PeopleCar />,
  },
  {
    path: "/people/:id",
    element: <ShowDetailPage />,
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ApolloProvider>
  );
}

export default App;
