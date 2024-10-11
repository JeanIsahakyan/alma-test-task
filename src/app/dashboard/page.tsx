import DashboardLayout from '@/components/dashboard/layout/dashboard-layout';
import { DashboardTable } from '@/components/dashboard/dashboard-table';

export default function DashboardPage() {
  return (
    <DashboardLayout active="leads">
      <DashboardTable/>
    </DashboardLayout>
  );
}
