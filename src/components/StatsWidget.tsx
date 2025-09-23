interface StatsWidgetProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  change?: string;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  change 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-l-secondary">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-gray-500 mt-1">{change}</p>
          )}
        </div>
        
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center
          ${color === 'bg-primary' ? 'bg-primary-light bg-opacity-20' :
            color === 'bg-secondary' ? 'bg-secondary-light bg-opacity-20' :
            'bg-accent-light bg-opacity-20'}
        `}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      
      {/* Progress bar or indicator */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`
              h-2 rounded-full transition-all duration-500
              ${color === 'bg-primary' ? 'bg-primary' :
                color === 'bg-secondary' ? 'bg-secondary' :
                'bg-accent'}
            `}
            style={{ width: '75%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;