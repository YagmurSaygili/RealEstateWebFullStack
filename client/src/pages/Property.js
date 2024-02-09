import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
function Property() {
  let { id } = useParams();
  const [propertyObject, setPropertyObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let history = useHistory(); // To redirect user to login page if not authenticated

  useEffect(() => {
    axios
      .get(`http://localhost:3001/properties/byId/${id}`)
      .then((Response) => {
        setPropertyObject(Response.data);
      });

    axios.get(`http://localhost:3001/comments/${id}`).then((Response) => {
      setComments(Response.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Infınıte loop burdan oluyormyş [] koymadım diye, a lot of API requests without it

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PropertyId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((Response) => {
        if (Response.data.error) {
          // To make sure comment not added in case user is not authenticated
          console.log(Response.data.error);
        } else {
          // Adding comment , authentication success
          const commentToAdd = {
            commentBody: newComment,
            username: Response.data.username,
          };
          console.log("I am almost sure it comes here");
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
        // Although it already does not store comment in database, this if else logic was needed
        // in order to avoid adding comment in the UI after the user submits comment
      });
  };

  const deleteProperty = (id) => {
    axios
      .delete(`http://localhost:3001/properties/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Property Deleted");
        history.push("/"); // Redirect to home page after deleting property
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter New Title:");
      axios.put(
        "http://localhost:3001/properties/title",
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPropertyObject({ ...propertyObject, title: newTitle });
    } else {
      let newPropertyText = prompt("Enter New Text:");
      axios.put(
        "http://localhost:3001/properties/propertyText",
        {
          newText: newPropertyText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPropertyObject({ ...propertyObject, propertyText: newPropertyText });
    }
  };


  return (
    <div className="propertyPage">
      <div className="leftSide">
        <div className="property" id="individual">
        <div
            className="title"
            onClick={() => {
              if (authState.username === propertyObject.username) {
                editPost("title");
              }
            }}
          >
            {propertyObject.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (authState.username === propertyObject.username) {
                editPost("body");
              }
            }}
          >
            {propertyObject.propertyText}
          </div>
          <div className="footer">
            {propertyObject.username}
            {authState.username === propertyObject.username && (
              <button
                onClick={() => {
                  deleteProperty(propertyObject.id);
                }}
              >
                {" "}
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment </button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Property;
