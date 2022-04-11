import React from "react";
import User from "./User.js";

export default function components() {
  return (
    <div className="container is-centered">
      <nav
        className="navbar is-align-items-center is-justify-content-space-between"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <p className="logo">
              <span className="logo__start">uii</span>
              <span className="logo__end">LET</span>
            </p>
          </a>
        </div>
        <User />
      </nav>
    </div>
  );
}
