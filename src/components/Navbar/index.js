import React from "react";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <h1 className="navbar-brand">L2W Quiz</h1>
    </nav>
  );
}

export default Navbar;