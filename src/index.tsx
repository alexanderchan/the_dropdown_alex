import React from "react";
import { render } from "react-dom";
import useFetch from "./hooks/useFetch";
import Dropdown, { Item } from "./components/Dropdown";

import "./styles/index.scss";

function App() {
  const { data, loading, error } = useFetch<Item[]>("./data.json");

  if (error) {
    return <div>Error loading data</div>;
  }
  return (
    <>
      <Dropdown
        items={data}
        loading={loading}
        onChange={item => {
          // Do something with the selected item
        }}
      />
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
