import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // These are called hooks

function Home() {
  const [listOfProperties, setListOfProperties] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3001/properties").then((Response) => {
      setListOfProperties(Response.data);
    });
  }, []);

  return (
    <div>
      {listOfProperties.map((value, key) => {
        return (
          <div
            key={key}
            className="property"
            onClick={() => {
              history.push(`/property/${value.id}`);
            }}
          >
            <div className="title">{value.title} </div>
            <div className="body">{value.propertyText} </div>
            <div className="footer">{value.username} </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
