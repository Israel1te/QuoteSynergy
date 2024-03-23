
import React from "react";
import { Link } from "react-router-dom";

const BlogMainPage = () => {
  return (
    <div>
      <h2>Main Blog Page</h2>
      <p>Welcome to our blog! Check out our latest posts:</p>
      <ul>
        <li>
          <Link to="/blog/post1">Blog Post 1</Link>
        </li>
        <li>
          <Link to="/blog/post2">Blog Post 2</Link>
        </li>
        <li>
          <Link to="/blog/post3">Blog Post 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogMainPage;
