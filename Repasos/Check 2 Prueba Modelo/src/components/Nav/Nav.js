import React from 'react';
import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <div>
      <Link to="/">TODOS</Link>
      <Link to="/add">Add Todo</Link>
      
    </div>
  )
};

export default Nav;