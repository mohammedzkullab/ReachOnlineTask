import { Table } from "components";
import DashboardLayout from "layouts/DashboardLayout";

const Dashboard = () => {
  const columns = ["manufacturer", "name", "sort_order", "status", "actions"];
  return (
    <DashboardLayout>
      <Table
        columns={columns}
        fetchUrl="/vendor/manufacturers"
        withoutSearch={false}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
