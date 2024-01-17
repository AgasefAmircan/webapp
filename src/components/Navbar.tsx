import { NavLink } from "react-router-dom";
import { FC } from "react";
const Navbar: FC = () => {
  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="account">Account</NavLink>
      <NavLink to="campaigns">Campaigns</NavLink>
      <NavLink to="profiles">Profiles</NavLink>
    </div>
  );
};

export default Navbar;
