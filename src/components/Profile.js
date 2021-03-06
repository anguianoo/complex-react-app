import React, { useEffect, useContext, useState } from "react";
import Page from "./Page";
import { useParams } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import ProfilePost from "./ProfilePost";

function Profile() {
  //returning object that could have many properties, thats why we use {}
  const { username } = useParams();

  const appState = useContext(StateContext);

  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: {
      postCount: "",
      postFollowers: "",
      postFollowing: ""
    }
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, {
          token: appState.user.token
        });

        setProfileData(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <Page title="Profile Screen">
      <h2>
        <img
          className="avatar-small"
          src={profileData.profileAvatar}
          alt="avatar"
        />
        {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts:
          {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers:
          {profileData.counts.postFollowers}
        </a>
        <a href="#" className="nav-item nav-link">
          Following:
          {profileData.counts.postFollowing}
        </a>
      </div>

      <ProfilePost />
    </Page>
  );
}

export default Profile;
