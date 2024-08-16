import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/tasks">All Tasks</Link>
      <Link to="/tasks/add">Add Task</Link>
      <Link to="/tasks/completed">Completed Tasks</Link>
      <Link to="/tasks/missed">Missed Tasks</Link>
      <Link to="/tasks/uncompleted">Uncompleted Tasks</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
};

export default Navbar;
