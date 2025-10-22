import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchAllData } from '../services/dataService';
import { Loader2, AlertCircle, Search } from 'lucide-react';
import { statusConfig } from '../config/statusConfig';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchAllData(query),
    enabled: query.length > 0,
  });

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Search className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-gray-500">กรุณาใส่คำค้นหา</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">กำลังค้นหา...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <AlertCircle className="w-8 h-8 text-red-600" />
        <span className="ml-2 text-red-600">เกิดข้อผิดพลาด: {error.message}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">ผลการค้นหา</h1>
        <p className="text-gray-600 mt-1">
          พบ {data?.length || 0} รายการสำหรับ "{query}"
        </p>
      </div>

      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((record, index) => {
            const statusCategory = record._statusCategory;
            const config = statusCategory ? statusConfig[statusCategory] : null;

            return (
              <div key={record._id || index} className="card hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {config && <span className={`badge ${config.badge}`}>{config.label}</span>}
                      <span className="text-xs text-gray-500">Sheet: {record._matchedSheet}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {record['ชื่อการค้า'] || record['ตราสินค้า'] || '-'}
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      {record['เลขทะเบียน'] && (
                        <div>
                          <span className="text-gray-500">เลขทะเบียน:</span>{' '}
                          <span className="font-medium">{record['เลขทะเบียน']}</span>
                        </div>
                      )}
                      {record['หน่วยงานที่ขึ้นทะเบียน'] && (
                        <div>
                          <span className="text-gray-500">หน่วยงาน:</span>{' '}
                          <span className="font-medium">{record['หน่วยงานที่ขึ้นทะเบียน']}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow">
          <Search className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-500">ไม่พบข้อมูลที่ค้นหา</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
