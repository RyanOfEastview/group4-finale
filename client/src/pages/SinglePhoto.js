import React from 'react';
import { useParams } from 'react-router-dom';
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

  const photo = data?.photo || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {photo.username}
          </span>{' '}
          photo on {photo.createdAt}
        </p>
        <div className="card-body">
          <p>{photo.photoText}</p>
        </div>
      </div>

      {photo.reactionCount > 0 && <ReactionList reactions={photo.reactions} />}
      {Auth.loggedIn() && <ReactionForm photoId={photo._id} />}
    </div>
  );
};

export default SinglePhoto;
