import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [listOfProperties, setListOfProperties] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/properties/byuserId/${id}`).then((response) => {
      setListOfProperties(response.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        {" "}
        <h1> Username: {username} </h1>
        {authState.username === username && (
          <button
            onClick={() => {
              history.push("/changepassword");
            }}
          >
            Change my password
          </button>
        )}
      </div>
      <div className="listOfProperties">
        {listOfProperties.map((value, key) => {
          return (
            <div key={key} className="property">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  history.push(`/property/${value.id}`);
                }}
              >
                {value.propertyText}
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <label> {value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;