import React from "react";
import CreateCoupons from "../../components/CreateCoupons";
import EditOrganization from "../../components/EditOrganization";

const AdminDashboard = () => {
  return (
    <div>
      <CreateCoupons />
      <EditOrganization />
    </div>
  );
};

export default AdminDashboard;
