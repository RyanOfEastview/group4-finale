import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
    if (!friends || !friends.length) {
        return <p className="bg-dark text-light p-3">{username}, find your friends to share your photos!</p>;
    }

    return (
        <div>
            <h5 className='friendlist-top'>
                {username}'s friend List ({friendCount} {friendCount === 1 ? 'friend' : 'friends'})
            </h5>
            {friends.map(friend => (
                <button className="btn w-100 display-block mb-2" key={friend._id}>
                    <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                </button>
            ))}
        </div>
    );
};

export default FriendList;