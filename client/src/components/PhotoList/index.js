import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

const PhotoList = ({ photos, title }) => {
  if (!photos.length) {
    return <h3>No Memories Yet</h3>;
  }
  console.log(photos);
  return (
    <div>
      <h3>{title}</h3>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${photo.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {photo.username}
              </Link>{" "}
              posted photo on {photo.createdAt}
            </p>
            <div className="card-body">
              <img
                src={photo.photoLink}
                className="my-2 photo-pic"
                alt={photo.photoPlace}
                key={photo.photoLink}
              />
              {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/57/Concord_Pacific_Master_Plan_Area.jpg"
                className="my-2 photo-pic"
                alt="new-pic"
              /> */}
              <div>
                <h4>
                  {/* Google Search with photo place */}
                  {/* <a href=`https://www.google.com/search?q=${photo.photoPlace}` target="_blank"
                    rel="noopener noreferrer" className='search-place'>
                    alt=""
                    key={photo.photoLink}
                    </a> */}
                  <a
                    href="https://www.google.com/search?q=Vancouver"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="search-place"
                  >
                    {photo.photoPlace}
                  </a>
                  <span> </span>
                  {/* Google Map with photo place */}
                  {/*href=`https://www.google.com/maps/place/${photo.place}`*/}

                  <a href="https://www.google.com/maps/place/Vancouver"
                    target="_blank"
                    rel="noopener noreferrer"
                  >

                  <FontAwesomeIcon icon={faMapLocationDot} size="xl" />
                  </a>
                  <span> </span>
                  {/* Expedia (Things to do) with photo place */}
                  {/*href=`https://www.expedia.ca/things-to-do/search?location=${photo.place}`*/}
                  <a
                    href="https://www.expedia.ca/things-to-do/search?location=Vancouver"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faPeopleGroup} size="xl" />
                  </a>
                </h4>
              </div>
              <p>{photo.photoText}</p>
              <Link to={`/photo/${photo._id}`}>
                <p className="mb-0 reaction-count">
                  Reactions: {photo.reactionCount} || Click here to{" "}
                  {photo.reactionCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PhotoList;
