import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
return (
    <div className="navbar bg-neutral text-neutral-content flex justify-center z-50">
        <NavLink to="/" className="btn btn-ghost">Dashboard</NavLink>
        <NavLink to="/add-invoice" className="btn btn-ghost">Add Invoice</NavLink>
    </div>
);
};

export default Navbar;
