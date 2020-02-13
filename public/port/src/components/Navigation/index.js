import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="navigation">
    <Link className="navigation-list" to="/">
        <div>Main
        </div>
    </Link>
    <Link className="navigation-list" to="/about">
      <div>About
      </div>
    </Link>
    <Link className="navigation-list" to="/feedback">
      <div>Feedback
      </div>
    </Link>
  </div>
);
