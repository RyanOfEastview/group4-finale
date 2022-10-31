import React from 'react';

import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_PHOTOS, QUERY_ME_BASIC } from '../utils/queries';

import PhotoList from '../components/PhotoList';
import FriendList from '../components/FriendList';
import PhotoForm from '../components/PhotoForm';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PHOTOS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const photos = data?.photos || [];
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <PhotoForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PhotoList photos={photos} title="Some Feed for Photo(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
