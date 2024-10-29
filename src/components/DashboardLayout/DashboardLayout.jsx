import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import "./DashboardLayout.scss";
import Navbar from "../navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
