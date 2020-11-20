import React from "react";
import ActiveCoupons from "../../components/ActiveCoupons";
import CouponsChart from "../../components/CouponsChart";
import CreateCoupons from "../../components/CreateCoupons";
import EditOrganization from "../../components/EditOrganization";
import UsedCoupons from "../../components/UsedCoupons";

const AdminDashboard = () => {
  return (
    <div>
      <ActiveCoupons />
      <UsedCoupons />
      <CouponsChart />
      <CreateCoupons />
      <EditOrganization />
    </div>
  );
};

export default AdminDashboard;
