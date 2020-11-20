import React from "react";
import ActiveCoupons from "../../components/ActiveCoupons";
import CouponsChart from "../../components/CouponsChart";
import CreateCoupons from "../../components/CreateCoupons";
import EditOrganization from "../../components/EditOrganization";

const AdminDashboard = () => {
  return (
    <div>
      <ActiveCoupons />
      <CouponsChart />
      <CreateCoupons />
      <EditOrganization />
    </div>
  );
};

export default AdminDashboard;
