import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, content, cover, author, createdAt }) => {
  const date = moment(createdAt);
  const formattedDate = date.fromNow();
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4400/${cover}`} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
          <p className="info">
            <a href="" className="author">
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
