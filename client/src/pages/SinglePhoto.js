import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PHOTO } from '../utils/queries';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';

const SinglePhoto = props => {
  const { id: photoId } = useParams();

  const { loading, data } = useQuery(QUERY_PHOTO, {
    variables: { id: photoId }
  });

  console.log(data);
  const photo = data?.photo || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <Link
            to={`/profile/${photo.username}`} style={{ fontWeight: 700 }} className="text-light">
            {photo.username}
          </Link>{' '}
          photo on {photo.createdAt}
        </p>
        <div className="card-body">
          {/* <img src={photo.link}} className="my-2 photo-pic" alt={place} /> //alt can be anything*/}
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Concord_Pacific_Master_Plan_Area.jpg"
            className="my-2 photo-pic" alt="new-pic" />
          <p>{photo.photoText}</p>
        </div>
      </div>

      {photo.reactionCount > 0 && <ReactionList reactions={photo.reactions} />}
      {Auth.loggedIn() && <ReactionForm photoId={photo._id} />}
    </div>
  );
};

export default SinglePhoto;
