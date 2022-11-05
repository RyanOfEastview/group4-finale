import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ currentUser, friendCount, username, friends }) => {

    if (!friends || !friends.length) {
        if (currentUser) {
            return <p className="find-friends p-3">{username}, find some friends to share your photos with!</p>;
        }
        else{
            return <p className="find-friends p-3">{username} would love to be friends with you!</p>;
        }
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