import { useQuery } from '@tanstack/react-query';
import { loadMetadata, loadAllData, getStatistics } from '../services/dataService';
import Dashboard from '../components/dashboard/Dashboard';
import SheetTabs from '../components/sheets/SheetTabs';
import SheetTable from '../components/sheets/SheetTable';
import useAppStore from '../store/useAppStore';
import { AlertCircle, Loader2 } from 'lucide-react';

function HomePage() {
  const { activeSheet } = useAppStore();

  // Load metadata
  const { data: metadata, isLoading: metadataLoading } = useQuery({
    queryKey: ['metadata'],
    queryFn: loadMetadata,
  });

  // Load all data for statistics
  const { data: allData, isLoading: dataLoading } = useQuery({
    queryKey: ['allData'],
    queryFn: loadAllData,
  });

  if (metadataLoading || dataLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">กำลังโหลดข้อมูล...</span>
      </div>
    );
  }

  if (!metadata || !allData) {
    return (
      <div className="flex items-center justify-center h-64">
        <AlertCircle className="w-8 h-8 text-red-600" />
        <span className="ml-2 text-red-600">ไม่สามารถโหลดข้อมูลได้</span>
      </div>
    );
  }

  // Calculate overall statistics
  const allRecords = Object.values(allData).flat();
  const stats = getStatistics(allRecords);

  return (
    <div className="space-y-6">
      {/* Dashboard */}
      <Dashboard stats={stats} metadata={metadata} />

      {/* Sheet Tabs */}
      <SheetTabs sheets={metadata.sheets} />

      {/* Active Sheet Table */}
      <SheetTable sheetName={activeSheet} />
    </div>
  );
}

export default HomePage;
