import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // These are called hooks
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [likedProperties, setLikedProperty] = useState([]);
  const [listOfProperties, setListOfProperties] = useState([]);
  let history = useHistory();
  const authState = useContext(AuthContext);

  useEffect(() => {
    //Check if the user is logged in
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/properties", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((Response) => {
          setListOfProperties(Response.data.listOfProperties);
          setLikedProperty(
            Response.data.likedProperties.map((like) => {
              return like.PropertyId;
            })
          );
        });
    }
  }, []);

  const likeAProperty = (propertyId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PropertyId: propertyId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfProperties(
          listOfProperties.map((property) => {
            if (property.id === propertyId) {
              if (response.data.liked) {
                return { ...property, Likes: [...property.Likes, 0] };
              } else {
                const likesArray = property.Likes;
                likesArray.pop();
                return { ...property, Likes: likesArray };
              }
            } else {
              return property;
            }
          })
        );
        if (likedProperties.includes(propertyId)) {
          setLikedProperty(
            likedProperties.filter((id) => {
              return id !== propertyId;
            })
          );
        } else {
          setLikedProperty([...likedProperties, propertyId]);
        }
      })
      .catch((error) => {
        console.error("Error liking property:", error);
      });
  };

  return (
    <div>
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
              <div> {value.username} </div>
              <div className="buttons">
              {value.username}{" "}
              <FaThumbsUp
                onClick={() => {
                  likeAProperty(value.id);
                }}
                className={
                  likedProperties.includes(value.id) ? "unlikeBttn" : "likeBttn"
                }
              />
              <label> {value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
