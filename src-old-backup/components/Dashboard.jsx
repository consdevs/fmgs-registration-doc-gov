import React from 'react';
import StatCard from './StatCard';

/**
 * Dashboard Component
 * Displays overview statistics in card format
 * @param {Object} props
 * @param {Object} props.stats - Statistics object containing counts
 */
const Dashboard = ({ stats }) => {
  const statCards = [
    {
      type: 'total',
      count: stats.total || 0,
      label: 'ทะเบียนทั้งหมด',
    },
    {
      type: 'expired',
      count: stats.expired || 0,
      label: 'ขาดอายุ',
    },
    {
      type: 'critical',
      count: stats.critical || 0,
      label: 'วิกฤติ (0-30 วัน)',
    },
    {
      type: 'warning',
      count: stats.warning || 0,
      label: 'ระวัง (31-90 วัน)',
    },
    {
      type: 'normal',
      count: stats.normal || 0,
      label: 'ปกติ (>90 วัน)',
    },
  ];

  return (
    <div className="mb-8">
      {/* Dashboard Title */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          📊 ภาพรวมสถิติ
        </h2>
        <p className="text-gray-600">
          สรุปสถานะทะเบียนผลิตภัณฑ์ทั้งหมด
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <StatCard
            key={card.type}
            type={card.type}
            count={card.count}
            label={card.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
