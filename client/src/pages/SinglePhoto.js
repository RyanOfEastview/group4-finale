import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PHOTO } from '../utils/queries';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';
import Modal from '../components/Modal';

const SinglePhoto = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState();

  const { id: photoId } = useParams();

  const { loading, data } = useQuery(QUERY_PHOTO, {
    variables: { id: photoId }
  });

  const photo = data?.photo || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleModal = (photo) => {
    setCurrentPhoto(photo);
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>
      {isModalOpen && (
        <Modal currentPhoto={currentPhoto} onClose={toggleModal} />
      )}
      <div className="card mb-3">
        <p className="card-header">
          <Link
            to={`/profile/${photo.username}`} style={{ fontWeight: 700 }} className="text-light">
            {photo.username}
          </Link>{' '}
          photo on {photo.createdAt}
        </p>
        <div className="card-body">
          <img src={photo.photoLink}
            className="my-2 photo-pic" alt="new-pic"
            onClick={() => toggleModal(photo)} />
          <p>{photo.photoText}</p>
        </div>
      </div>

      {photo.reactionCount > 0 && <ReactionList reactions={photo.reactions} />}
      {Auth.loggedIn() && <ReactionForm photoId={photo._id} />}
    </div>
  );
};

export default SinglePhoto;
