import React, { useState } from 'react';
import { STATUS_CONFIG, ITEMS_PER_PAGE } from '../config/constants';

/**
 * Registration List Component
 * Displays a table of registrations with pagination
 * @param {Object} props
 * @param {Array} props.registrations - Array of registration objects
 */
const RegistrationList = ({ registrations }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(registrations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = registrations.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  // Get status badge styling
  const getStatusBadge = (statusCategory) => {
    const config = STATUS_CONFIG[statusCategory] || STATUS_CONFIG.normal;
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.color} text-white`}
      >
        <span className="mr-1">{config.emoji}</span>
        {config.label}
      </span>
    );
  };

  // Format days remaining display
  const formatDaysRemaining = (days) => {
    if (days < 0) {
      return `เกินกำหนด ${Math.abs(days)} วัน`;
    } else if (days === 0) {
      return 'หมดอายุวันนี้';
    } else if (days === 1) {
      return 'เหลือ 1 วัน';
    }
    return `เหลือ ${days} วัน`;
  };

  if (registrations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          ไม่พบข้อมูล
        </h3>
        <p className="text-gray-500">
          ไม่พบรายการทะเบียนที่ตรงกับการค้นหา
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">
          📋 รายการทะเบียนผลิตภัณฑ์
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          แสดง {startIndex + 1}-{Math.min(endIndex, registrations.length)} จากทั้งหมด {registrations.length} รายการ
        </p>
      </div>

      {/* Table - Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                เลขทะเบียน
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ชื่อการค้า
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ประเภท
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                หน่วยงาน
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                วันหมดอายุ
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                วันเหลือ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 text-sm text-gray-500">
                  {startIndex + index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.regNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {item.tradeName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.regType}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.organization}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.expiryDate}
                </td>
                <td className="px-6 py-4 text-sm">
                  {getStatusBadge(item.statusCategory)}
                </td>
                <td className="px-6 py-4 text-sm font-semibold">
                  <span
                    className={`${STATUS_CONFIG[item.statusCategory]?.textColor || 'text-gray-600'}`}
                  >
                    {formatDaysRemaining(item.daysRemaining)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View - Mobile/Tablet */}
      <div className="lg:hidden divide-y divide-gray-200">
        {currentItems.map((item, index) => (
          <div
            key={item.id}
            className="p-6 hover:bg-blue-50 transition-colors duration-150"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-gray-500">
                #{startIndex + index + 1}
              </span>
              {getStatusBadge(item.statusCategory)}
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {item.regNumber}
            </h3>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-gray-600">ชื่อการค้า:</span>
                <span className="ml-2 text-gray-700">{item.tradeName}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">ประเภท:</span>
                <span className="ml-2 text-gray-700">{item.regType}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">หน่วยงาน:</span>
                <span className="ml-2 text-gray-700">{item.organization}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">วันหมดอายุ:</span>
                <span className="ml-2 text-gray-700">{item.expiryDate}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">วันเหลือ:</span>
                <span
                  className={`ml-2 font-semibold ${STATUS_CONFIG[item.statusCategory]?.textColor || 'text-gray-600'}`}
                >
                  {formatDaysRemaining(item.daysRemaining)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Page Info */}
            <div className="text-sm text-gray-600">
              หน้า <span className="font-semibold">{currentPage}</span> จาก{' '}
              <span className="font-semibold">{totalPages}</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* First Page */}
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                title="หน้าแรก"
              >
                «
              </button>

              {/* Previous Page */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                title="ก่อนหน้า"
              >
                ‹
              </button>

              {/* Page Numbers */}
              <div className="hidden sm:flex gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show only nearby pages
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                          currentPage === pageNumber
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span key={pageNumber} className="px-2 py-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Next Page */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                title="ถัดไป"
              >
                ›
              </button>

              {/* Last Page */}
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                title="หน้าสุดท้าย"
              >
                »
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationList;
