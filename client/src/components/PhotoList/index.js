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
              {/* <img src={photo.link}} className="my-2 photo-pic" alt={place} /> //alt can be anything*/}
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Concord_Pacific_Master_Plan_Area.jpg"
                className="my-2 photo-pic" alt="new-pic" />
              <div>
                { /*src=`https://www.google.com/maps/place/${photo.place}`*/}
                <a href='https://www.google.com/maps/place/Vancouver' target="_blank"
                  rel="noopener noreferrer">Map</a>
              </div>
              <p>{photo.photoText}</p>
              <Link to={`/photo/${photo._id}`}>
                <p className="mb-0">
                  Reactions: {photo.reactionCount} || Click here to{' '}
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
