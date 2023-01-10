import React from "react";
import { Link } from "react-router-dom";

const Header = ({ back }) => {
  return (
    <div className="header">
      <div className="width">
        {back && (
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24"
            >
              <path
                fill="currentColor"
                d="m22.35 38.95-13.9-13.9q-.25-.25-.35-.5Q8 24.3 8 24q0-.3.1-.55.1-.25.35-.5L22.4 9q.4-.4 1-.4t1.05.45q.45.45.45 1.05 0 .6-.45 1.05L13.1 22.5h24.8q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075-.425.425-1.075.425H13.1l11.4 11.4q.4.4.4 1t-.45 1.05q-.45.45-1.05.45-.6 0-1.05-.45Z"
              />
            </svg>
          </Link>
        )}
        <h1>
          <Link to="/">Cryptonic!</Link>
        </h1>
      </div>
    </div>
  );
};

export default Header;
