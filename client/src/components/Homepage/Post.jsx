import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import notfound from "../../images/not-found-image.jpg";

const Post = ({ _id, title, summary, cover, author, createdAt }) => {
  const date = moment(createdAt);
  const formattedDate = date.fromNow();
  return (
    <div className="post">
      
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img
            src={`${process.env.REACT_APP_API_URL}/${cover}`}
            onError={e => {
              e.target.onerror = null;
              e.target.src = notfound;
            }}
            alt="Not Found"
          />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
          <p className="info">
            <a href="/" className="author">
              {author}
            </a>
            <time>{formattedDate}</time>
          </p>
          <p className="summary">{summary}</p>
        </Link>
      </div>
    </div>
  );
};

export default Post;
