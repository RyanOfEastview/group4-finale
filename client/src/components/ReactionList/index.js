import React from 'react';
import { Link } from 'react-router-dom';

const ReactionList = ({ reactions }) => {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <span className="text-dark">Reactions</span>
            </div>
            <div className="card-body">
                {reactions &&
                    reactions.map(reaction => (
                        <p className="pill mb-3" key={reaction._id}>
                            {reaction.reactionBody} <br></br>
                            {'  by '}
                            <Link to={`/profile/${reaction.username}`} style={{ fontWeight: 700 }}>
                                {reaction.username} 
                            </Link>
                                <span> on {reaction.createdAt} </span>
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default ReactionList;