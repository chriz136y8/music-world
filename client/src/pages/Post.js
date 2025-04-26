import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

const Post = ({ id, title, imageUrl, upvotes, created_at }) => {
  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="Post">
      <Link to={`/post/${id}`} className="post-link">
        <div className="post-image-container">
          {imageUrl ? (
            <img 
              className="post-image" 
              src={imageUrl} 
              alt={title} 
            />
          ) : (
            <div className="post-image-placeholder">
              <span>🎵</span>
            </div>
          )}
        </div>
        <div className="post-content">
          <h2 className="post-title">{title}</h2>
          <div className="post-meta">
            <span className="post-date">{formatDate(created_at)}</span>
            <span className="post-upvotes">👍 {upvotes}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;