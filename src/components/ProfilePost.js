import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";

function ProfilePost() {
  const { username } = useParams();
  //send request to backend
  //as long as isLoading is true, we return the loading icon
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPosts] = useState([]);

  useEffect(
    () => {
      async function fetchPosts() {
        try {
          const response = await Axios.get(`/profile/${username}/posts`);
          
          setPosts(response.data);
          setIsLoading(false);
        } catch (e) {
          console.log("there was a problem");
        }
      }
      fetchPosts();
    },
    //only run this when component first renders
    []
  );

  if (isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <div className="list-group">
      {post.map(post => {
        const date = new Date(post.createdDate);
        const dateFormatted = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;

        return (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="list-group-item list-group-item-action"
          >
            <img className="avatar-tiny" src={post.author.avatar} />
            <strong>{post.title}</strong>{" "}
            <span className="text-muted small"> on {dateFormatted} </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePost;
