import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import PhotoForm from '../components/PhotoForm';
import PhotoList from '../components/PhotoList';
import FriendList from '../components/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_ME_BASIC } from '../utils/queries';
import { ADD_FRIEND, DELETE_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const [deleteFriend] = useMutation(DELETE_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const { data: myData } = useQuery(QUERY_ME_BASIC);
  const myfriendsList = myData?.me.friends || [];
  const friendUserNameArray = myfriendsList.map((friend) => friend.username
  );


  const addedOrNot = () => {
    //get myFriends
    if (!friendUserNameArray) {
      return "Hi";
    }
    const friendAns = friendUserNameArray.includes(userParam);
    if (friendAns) {
      return "Added Friend (Click to delete friend)";
    }
    else {
      return "Add Friend";
    }
  }

  const [addFriendButtonText, setFriendButtonText] = useState(() => addedOrNot());

  useEffect(() => {
    setFriendButtonText(addedOrNot());
    // eslint-disable-next-line
  });

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleClick = async (e) => {
    const buttonText = e.target.innerHTML;
    try {
      if (addFriendButtonText === "Add Friend") {
        await addFriend({
          variables: { id: user._id },
        });
        setFriendButtonText("Added Friend (Click to delete friend)");
      }
      else if (addFriendButtonText === "Added Friend (Click to delete friend)") {
        //Delete Mutation function
        await deleteFriend({
          variables: { id: user._id },
        });
        setFriendButtonText("Add Friend");
      }

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark display-inline-block">
          {userParam ? `Welcome to ${user.username}'s` : 'Here is your'} profile.
        </h2>

        {Auth.loggedIn() && userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            {addFriendButtonText}
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <PhotoList
            photos={user.photos}
            title={`${user.username}'s photos...`}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <PhotoForm />}</div>
    </div>
  );
};

export default Profile;
