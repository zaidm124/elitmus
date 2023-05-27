import React from "react";
import NavBar from "./Navbar";
import Stats from "./admin/Stats";
import LeaderBoard from "./admin/LeaderBoard";

const AdminDashboard = ({ status, setStatus }) => {
  if (status == 0) {
    return <Stats />;
  } else if (status == 1) {
    return <LeaderBoard />;
  }
};

export default AdminDashboard;
