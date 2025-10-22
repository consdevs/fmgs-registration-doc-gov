import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { loadSheetData } from '../../services/dataService';
import { Loader2, AlertCircle, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { statusConfig } from '../../config/statusConfig';

function SheetTable({ sheetName }) {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

  // Load sheet data
  const { data, isLoading, error } = useQuery({
    queryKey: ['sheet', sheetName],
    queryFn: () => loadSheetData(sheetName),
    enabled: !!sheetName,
  });

  // Create columns dynamically from first record
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    const firstRecord = data[0];
    const fieldNames = Object.keys(firstRecord).filter(key => !key.startsWith('_'));

    return fieldNames.slice(0, 8).map(field => ({
      accessorKey: field,
      header: field,
      cell: ({ getValue, row }) => {
        const value = getValue();

        // Special rendering for status field
        if (field.includes('สถานะ')) {
          const statusCategory = row.original._statusCategory;
          if (statusCategory && statusConfig[statusCategory]) {
            const config = statusConfig[statusCategory];
            return (
              <span className={`badge ${config.badge}`}>
                {value || '-'}
              </span>
            );
          }
        }

        // Special rendering for document links
        if (field === 'PCT.' && value && value.startsWith('http')) {
          return (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              ดูเอกสาร
            </a>
          );
        }

        return <span className="text-sm text-gray-900">{value || '-'}</span>;
      },
    }));
  }, [data]);

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">กำลังโหลดข้อมูล...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
        <AlertCircle className="w-8 h-8 text-red-600" />
        <span className="ml-2 text-red-600">เกิดข้อผิดพลาด: {error.message}</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
        <p className="text-gray-500">ไม่มีข้อมูลในชีทนี้</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="table-header cursor-pointer select-none hover:bg-gray-100"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{header.column.columnDef.header}</span>
                      {header.column.getIsSorted() === 'asc' && <ChevronUp className="w-4 h-4" />}
                      {header.column.getIsSorted() === 'desc' && <ChevronDown className="w-4 h-4" />}
                      {!header.column.getIsSorted() && <ChevronsUpDown className="w-4 h-4 opacity-30" />}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="table-cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          แสดง {table.getRowModel().rows.length} จาก {data.length} รายการ
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ก่อนหน้า
          </button>
          <span className="text-sm text-gray-700">
            หน้า {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default SheetTable;
