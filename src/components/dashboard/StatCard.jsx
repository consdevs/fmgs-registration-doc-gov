function StatCard({ title, value, icon: Icon, color, subtitle }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
  };

  const borderColors = {
    blue: 'border-blue-200',
    red: 'border-red-200',
    orange: 'border-orange-200',
    yellow: 'border-yellow-200',
    green: 'border-green-200',
  };

  return (
    <div className={`card hover:shadow-md transition-shadow ${borderColors[color]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value?.toLocaleString() || 0}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
