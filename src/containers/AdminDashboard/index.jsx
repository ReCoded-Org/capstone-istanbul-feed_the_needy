import React from "react";
import CouponsChart from "../../components/CouponsChart";
import CreateCoupons from "../../components/CreateCoupons";
import EditOrganization from "../../components/EditOrganization";

const AdminDashboard = () => {
  return (
    <div>
      <CouponsChart />
      <CreateCoupons />
      <EditOrganization />
    </div>
  );
};

export default AdminDashboard;
