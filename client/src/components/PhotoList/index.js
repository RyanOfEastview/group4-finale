import React from 'react';
import { Link } from 'react-router-dom';

const PhotoList = ({ photos, title }) => {
  if (!photos.length) {
    return <h3>No Memories Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {photos &&
        photos.map(photo => (
          <div key={photo._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${photo.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {photo.username}
              </Link>{' '}
              posted photo on {photo.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/photo/${photo._id}`}>
                <p>{photo.photoText}</p>
                <p className="mb-0">
                  Reactions: {photo.reactionCount} || Click to{' '}
                  {photo.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PhotoList;
