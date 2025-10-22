import StatCard from './StatCard';
import { FileText, AlertTriangle, Zap, Info, CheckCircle } from 'lucide-react';

function Dashboard({ stats, metadata }) {
  const cards = [
    {
      title: 'ทะเบียนทั้งหมด',
      value: stats.total,
      icon: FileText,
      color: 'blue',
      subtitle: `${metadata?.totalSheets || 0} sheets`,
    },
    {
      title: 'ขาดอายุ',
      value: stats.expired,
      icon: AlertTriangle,
      color: 'red',
      subtitle: 'ต้องดำเนินการด่วน',
    },
    {
      title: 'วิกฤติ (0-30 วัน)',
      value: stats.critical,
      icon: Zap,
      color: 'orange',
      subtitle: 'ใกล้หมดอายุมาก',
    },
    {
      title: 'ระวัง (31-90 วัน)',
      value: stats.warning,
      icon: Info,
      color: 'yellow',
      subtitle: 'ควรเตรียมต่ออายุ',
    },
    {
      title: 'ปกติ (>90 วัน)',
      value: stats.normal + stats.nearExpiry,
      icon: CheckCircle,
      color: 'green',
      subtitle: 'ยังไม่ต้องดำเนินการ',
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">ภาพรวมทะเบียน</h2>
        <p className="text-sm text-gray-500 mt-1">
          อัพเดทล่าสุด: {metadata?.exportedAt ? new Date(metadata.exportedAt).toLocaleDateString('th-TH') : '-'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
