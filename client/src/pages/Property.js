import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Property() {
  let { id } = useParams();
  const [propertyObject, setPropertyObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/properties/byId/${id}`)
      .then((Response) => {
        setPropertyObject(Response.data);
      });

    axios.get(`http://localhost:3001/comments/${id}`).then((Response) => {
      setComments(Response.data);
    });
  }, [id]); // Infınıte loop burdan oluyormyş [] koymadım diye, a lot of API requests without it
  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", 
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
          console.log(Response.data.error)
        } else {
          // Adding comment , authentication success
          const commentToAdd = {
            commentBody: newComment,
            username: Response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
        // Although it already does not store comment in database, this if else logic was needed
        // in order to avoid adding comment in the UI after the user submits comment
      });
  };
  return (
    <div className="propertyPage">
      <div className="leftSide">
        <div className="property" id="individual">
          <div className="title">{propertyObject.title}</div>
          <div className="body">{propertyObject.propertyText}</div>
          <div className="footer">{propertyObject.username}</div>
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
                <label> from Username: {comment.username}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Property;
