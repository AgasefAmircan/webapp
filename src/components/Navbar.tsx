import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="account">Account</Link>
      <Link to="campaigns">Campaigns</Link>
      <Link to="profiles">Profiles</Link>
    </div>
  );
};

export default Navbar;
